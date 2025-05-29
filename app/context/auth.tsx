import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { login } from "@/lib/data";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  AuthError,
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import * as jose from "jose";
import { tokenCache } from "@/utils/cache";
import { BASE_URL, API_URL } from "@/utils/constants";
import { handleAppleAuthError } from "@/utils/handleAppleError";
import { randomUUID } from "expo-crypto";
import { Platform } from "react-native";
import { useStatsStore } from "@/stores/statsStore";

export const AuthContext = createContext({
  user: null as User | null,
  loggedIn: false,
  loading: true,
  login: async (username: string, password: string) => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  register: async (registerForm: registerFormType) => {},
  signInWithApple: () => {},
  signInWithAppleWebBrowser: () => Promise.resolve(),
  isLoading: true,
  error: null as AuthError | null,
  needsRegistration: { visible: false, data: null },
  setNeedsRegistration: (needsRegistration: {
    visible: boolean;
    data: any;
  }) => {},
  update: async (user: Partial<User>): Promise<boolean> => false,
  isUpdating: false,
  getFoodImage: async (image: string): Promise<FoodImage | null> => null,
  foodImageLoading: false,
  workouts: [] as any[],
});

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
};

const appleConfig: AuthRequestConfig = {
  clientId: "apple",
  scopes: ["name", "email"],
  redirectUri: makeRedirectUri(),
};

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `https://server.tengis.space/auth/authorize`,
  tokenEndpoint: `https://server.tengis.space/auth/token`,
};

const appleDiscovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/apple/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/apple/token`,
};

const isWeb = Platform.OS === "web";

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [foodImageLoading, setFoodImageLoading] = useState(false);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [needsRegistration, setNeedsRegistration] = useState<{
    visible: boolean;
    data: any;
  }>({ visible: false, data: null });
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [request, response, promptAsync] = useAuthRequest(config, discovery);
  const refreshInProgressRef = useRef(false);
  const [appleRequest, appleResponse, promptAppleAsync] = useAuthRequest(
    appleConfig,
    appleDiscovery
  );
  const { setField } = useStatsStore();

  const loadGoals = async (goals: DailyGoals) => {
    setField("stepsGoal", goals.stepsGoal);
    setField("waterGoal", goals.waterGoal);
    setField("caloriesGoal", goals.caloriesGoal);
    setField("proteinGoal", goals.proteinGoal);
    setField("carbsGoal", goals.carbsGoal);
    setField("fatGoal", goals.fatGoal);
    setField("sleepGoal", goals.sleepGoal);
    setField("rdcGoal", goals.rdcGoal);
  };

  const refreshAccessToken = useCallback(
    async (tokenToUse?: string) => {
      // Prevent multiple simultaneous refresh attempts
      if (refreshInProgressRef.current) {
        console.log("Token refresh already in progress, skipping");
        return null;
      }

      refreshInProgressRef.current = true;

      try {
        console.log("Refreshing access token...");
        const storedRefreshToken = await tokenCache?.getToken("refreshToken");

        const currentRefreshToken =
          tokenToUse || refreshToken || storedRefreshToken;

        if (!currentRefreshToken) {
          console.error("No refresh token available");
          signOut();
          return null;
        }

        console.log("Using refresh token to get new tokens");
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentRefreshToken}`,
          },
        });

        if (!refreshResponse.ok) {
          const errorData = await refreshResponse.json();
          console.error("Token refresh failed:", errorData);

          // If refresh fails due to expired token, sign out
          if (refreshResponse.status === 401) {
            signOut();
          }
          return null;
        }

        // For native: Update both tokens
        const data = await refreshResponse.json();
        console.log("data+++++++++++++++++++++++++++", data);
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        setUser(data.user as User);
        loadGoals(data.user.dailyGoals as DailyGoals);

        console.log(
          "Received new access token:",
          newAccessToken ? "exists" : "missing"
        );
        console.log(
          "Received new refresh token:",
          newRefreshToken ? "exists" : "missing"
        );

        if (newAccessToken) setAccessToken(newAccessToken);
        if (newRefreshToken) setRefreshToken(newRefreshToken);

        await tokenCache?.saveToken("accessToken", newAccessToken);
        await tokenCache?.saveToken("refreshToken", newRefreshToken);

        return newAccessToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
        // If there's an error refreshing, we should sign out
        signOut();
        return null;
      } finally {
        refreshInProgressRef.current = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshToken]
  );

  const signOut = async () => {
    setNeedsRegistration({ visible: false, data: null });
    if (isWeb) {
      // For web: Call logout endpoint to clear the cookie
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error during web logout:", error);
      }
    } else {
      // For native: Clear both tokens from cache
      await tokenCache?.deleteToken("accessToken");
      await tokenCache?.deleteToken("refreshToken");
    }

    // Clear state
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const handleResponse = useCallback(async () => {
    console.log("handleResponse", response);
    if (response?.type === "success") {
      console.log("handleResponse success", response);
      try {
        setIsLoading(true);
        const { code } = response.params;

        const serverResponse = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
          }),
        });

        if (serverResponse.status === 202) {
          const data = await serverResponse.json();
          setNeedsRegistration({
            visible: true,
            data: data.data,
          });
          return;
        }

        if (!serverResponse.ok) {
          const data = await serverResponse.json();
          console.error("Error handling auth response1:", data);
          return;
        }

        const data = await serverResponse.json();

        console.log("handleResponse data", data);
        setUser(data.user);
        await tokenCache?.saveToken("accessToken", data.accessToken);
        await tokenCache?.saveToken("refreshToken", data.refreshToken);
      } catch (e) {
        console.error("Error handling auth response2:", e);
      } finally {
        setIsLoading(false);
      }
    } else if (response?.type === "cancel") {
      alert("Sign in cancelled");
    } else if (response?.type === "error") {
      setError(response?.error as AuthError);
    }
  }, [response]);

  const handleAppleResponse = async () => {
    // if (appleResponse?.type === "success") {
    //   try {
    //     const { code } = appleResponse.params;
    //     const response = await exchangeCodeAsync(
    //       {
    //         clientId: "apple",
    //         code,
    //         redirectUri: makeRedirectUri(),
    //         extraParams: {
    //           platform: Platform.OS,
    //         },
    //       },
    //       appleDiscovery
    //     );
    //     console.log("response", response);
    //     if (isWeb) {
    //       // For web: The server sets the tokens in HTTP-only cookies
    //       // We just need to get the user data from the response
    //       const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
    //         method: "GET",
    //         credentials: "include",
    //       });
    //       if (sessionResponse.ok) {
    //         const sessionData = await sessionResponse.json();
    //         setUser(sessionData as User);
    //       }
    //     } else {
    //       // For native: The server returns both tokens in the response
    //       // We need to store these tokens securely and decode the user data
    //       await handleNativeTokens({
    //         accessToken: response.accessToken,
    //         refreshToken: response.refreshToken!,
    //       });
    //     }
    //   } catch (e) {
    //     console.log("Error exchanging code:", e);
    //   }
    // } else if (appleResponse?.type === "cancel") {
    //   console.log("appleResponse cancelled");
    // } else if (appleResponse?.type === "error") {
    //   console.log("appleResponse error");
    // }
  };

  const loginWithGoogle = async () => {
    setNeedsRegistration({ visible: false, data: null });
    try {
      if (!request) {
        console.log("No request");
        return;
      }

      await promptAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (formData: registerFormType): Promise<void> => {
    setLoading(true);
    setNeedsRegistration({ visible: false, data: null });
    console.log(formData);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        return res.text().then((text: any) => {
          console.log("Error response:", text);
          throw new Error("Registration failed");
        });
      }
      const data = await res.json();
      setUser(data.user);
      setLoggedIn(true);
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (
    email?: string,
    password?: string
  ): Promise<void> => {
    setLoading(true);
    const res = await login(email, password);
    if (!res?.user) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    setUser(res.user);
    setLoggedIn(true);
    setLoading(false);
    tokenCache?.saveToken("accessToken", res.accessToken);
    tokenCache?.saveToken("refreshToken", res.refreshToken);
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
  };

  const signInWithAppleWebBrowser = async (): Promise<void> => {
    try {
      if (!appleRequest) {
        console.log("No appleRequest");
        return;
      }
      await promptAppleAsync();
    } catch (e) {
      console.log(e);
    }
  };

  // Native Apple Sign In
  const signInWithApple = async (): Promise<void> => {
    try {
      const rawNonce = randomUUID();
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: rawNonce,
      });

      // console.log("🍎 credential", JSON.stringify(credential, null, 2));

      if (credential.fullName?.givenName && credential.email) {
        // This is the first sign in
        // This is our only chance to get the user's name and email
        // We need to store this info in our database
        // You can handle this on the server side as well, just keep in mind that
        // Apple only provides name and email on the first sign in
        // On subsequent sign ins, these fields will be null
        console.log("🍎 first sign in");
      }

      // Send both the identity token and authorization code to server
      const appleResponse = await fetch(
        `${BASE_URL}/api/auth/apple/apple-native`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identityToken: credential.identityToken,
            rawNonce, // Use the rawNonce we generated and passed to Apple

            // IMPORTANT:
            // Apple only provides name and email on the first sign in
            // On subsequent sign ins, these fields will be null
            // We need to store the user info from the first sign in in our database
            // And retrieve it on subsequent sign ins using the stable user ID
            givenName: credential.fullName?.givenName,
            familyName: credential.fullName?.familyName,
            email: credential.email,
          }),
        }
      );

      const tokens = await appleResponse.json();
      await handleNativeTokens(tokens);
    } catch (e) {
      console.log(e);
      handleAppleAuthError(e);
    }
  };

  const handleNativeTokens = async (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    console.log(
      "Received initial access token:",
      newAccessToken ? "exists" : "missing"
    );
    console.log(
      "Received initial refresh token:",
      newRefreshToken ? "exists" : "missing"
    );

    // Store tokens in state
    if (newAccessToken) setAccessToken(newAccessToken);
    if (newRefreshToken) setRefreshToken(newRefreshToken);

    // Save tokens to secure storage for persistence
    if (newAccessToken)
      await tokenCache?.saveToken("accessToken", newAccessToken);
    if (newRefreshToken)
      await tokenCache?.saveToken("refreshToken", newRefreshToken);

    // Decode the JWT access token to get user information
    if (newAccessToken) {
      const decoded = jose.decodeJwt(newAccessToken);
      setUser(decoded as User);
    }
  };

  const update = async (user: Partial<User>): Promise<boolean> => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      // Add all user info to formData
      Object.entries(user).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "image") {
            const filename = value.split("/").pop();
            const match = /\.(\w+)$/.exec(filename ?? "");
            const type = match ? `image/${match[1]}` : `image`;
            formData.append("image", {
              uri: value,
              name: filename,
              type,
            } as any);
          } else {
            formData.append(key, value as any);
          }
        }
      });
      console.log(formData.get("image"));
      const res = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!res.ok) {
        console.error("Error updating user:", res.status, await res.json());
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (e) {
      console.error("Error updating user:", e);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const getDailyFood = async (): Promise<void> => {
    const cachedDailyFoods = await tokenCache?.getToken("dailyFoods");
    if (cachedDailyFoods) {
      console.log("🍎 cached daily foods");
      const parsedCache = JSON.parse(cachedDailyFoods);
      const cacheDate = new Date(parsedCache.timestamp);
      const today = new Date();
      // delete timestamp from parsedCache
      delete parsedCache.timestamp;

      // Check if the cached data is from today
      if (cacheDate.toDateString() === today.toDateString()) {
        setField("dailyFoods", parsedCache);
        return;
      }
    }
    console.log("🍎 getting daily food");
    if (!accessToken) {
      console.log("No access token, skipping daily food");
      return;
    }

    const res = await fetch(`${API_URL}/auth/food`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("Error getting daily food:", res.status, await res.json());
      return;
    }

    const data = await res.json();
    await tokenCache?.saveToken(
      "dailyFoods",
      JSON.stringify({ ...data, timestamp: new Date().toISOString() })
    );
    setField("dailyFoods", data);
    console.log("🍎 daily food", data);
  };

  const getFoodImage = async (image: string): Promise<FoodImage | null> => {
    setFoodImageLoading(true);
    try {
      const formData = new FormData();
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("image", {
        uri: image,
        name: filename,
        type,
      } as any);

      const res = await fetch(`${API_URL}/auth/food/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!res.ok) {
        console.error(
          "Error getting food image:",
          res.status,
          console.log(await res.json())
        );
        return null;
      }
      const data = await res.json();
      return data;
    } catch (e) {
      // get more info about the error
      console.log("Error getting food image:", e);
      return null;
    } finally {
      setFoodImageLoading(false);
    }
  };

  const getWorkouts = async (): Promise<void> => {
    try {
      const cachedWorkouts = await tokenCache?.getToken("workouts");
      if (cachedWorkouts) {
        const parsedCache = JSON.parse(cachedWorkouts);
        const cacheDate = new Date(parsedCache.timestamp);
        const today = new Date();

        // Check if the cached data is from today
        if (cacheDate.toDateString() === today.toDateString()) {
          setWorkouts(parsedCache.data);
          console.log("🍎 workouts from cache");
          return;
        }
      }

      console.log("🍎 getting workouts from API");
      if (!accessToken) {
        console.log("No access token, skipping workouts");
        return;
      }

      const res = await fetch(`${API_URL}/auth/exercise`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        console.error("Error getting workouts:", res.status, await res.json());
        return;
      }
      const data = await res.json();
      console.log("🍎 workouts", data);
      setWorkouts(data);
      await tokenCache?.saveToken(
        "workouts",
        JSON.stringify({ data, timestamp: new Date().toISOString() })
      );
    } catch (e) {
      console.error("Error getting workouts:", e);
    }
  };

  // check login
  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      // For native: Try to use the stored access token first
      try {
        const storedAccessToken = await tokenCache?.getToken("accessToken");
        const storedRefreshToken = await tokenCache?.getToken("refreshToken");

        if (storedAccessToken) {
          try {
            // Check if the access token is still valid
            const decoded = jose.decodeJwt(storedAccessToken);
            const exp = (decoded as any).exp;
            const now = Math.floor(Date.now() / 1000);

            if (exp && exp > now) {
              // Access token is still valid
              console.log("Access token is still valid, using it");
              setAccessToken(storedAccessToken);
              setUser(decoded as User);

              if (storedRefreshToken) {
                setRefreshToken(storedRefreshToken);
                refreshAccessToken(storedRefreshToken);
              }
            } else if (storedRefreshToken) {
              // Access token expired, but we have a refresh token
              console.log("Access token expired, using refresh token");
              setRefreshToken(storedRefreshToken);
              await refreshAccessToken(storedRefreshToken);
            }
          } catch (e) {
            console.error("Error decoding stored token:", e);

            // Try to refresh using the refresh token
            if (storedRefreshToken) {
              console.log("Error with access token, trying refresh token");
              setRefreshToken(storedRefreshToken);
              await refreshAccessToken(storedRefreshToken);
            }
          }
        } else if (storedRefreshToken) {
          // No access token, but we have a refresh token
          console.log("No access token, using refresh token");
          setRefreshToken(storedRefreshToken);
          await refreshAccessToken(storedRefreshToken);
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error checking login:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      getDailyFood();
      getWorkouts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    handleResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    handleAppleResponse();
  }, [appleResponse]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken(refreshToken as string);
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login: loginUser,
        loginWithGoogle,
        logout: signOut,
        register,
        signInWithApple,
        signInWithAppleWebBrowser,
        isLoading,
        error,
        needsRegistration,
        setNeedsRegistration,
        update,
        getFoodImage,
        foodImageLoading,
        isUpdating,
        workouts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
