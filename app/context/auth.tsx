import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { login, logout } from "@/lib/data";

type AuthContextType = {
  user: any;
  loggedIn: boolean;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (formData: registerFormType) => Promise<void>;
};

const api = process.env.EXPO_PUBLIC_API_URL as string;

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLogin = useCallback(async () => {
    setLoading(true);
    const response = await login();
    if (!response?.user) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }
    setUser(response.user);
    setLoggedIn(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const logoutUser = async () => {
    logout();
    setUser(null);
    setLoggedIn(false);
  };

  const registerUser = async (formData: registerFormType) => {
    setLoading(true);
    console.log(formData);
    try {
      const res = await fetch(`${api}/auth/register`, {
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
      setUser(data);
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

  const loginUser = async (email?: string, password?: string) => {
    setLoading(true);
    const response = await login(email, password);
    if (!response?.user) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }
    setUser(response.user);
    setLoggedIn(true);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
