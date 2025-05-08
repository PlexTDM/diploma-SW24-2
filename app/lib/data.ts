import AsyncStorage from "@react-native-async-storage/async-storage";

const api =
  (process.env.EXPO_PUBLIC_API_URL as string) || "http://localhost:3000";

export const register = async (data: RegisterState) => {
  return fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export async function login(
  email?: string,
  password?: string
): Promise<LoginResponse | null> {
  try {
    // Try cookie-based session first
    const sessionRes = await fetch("https://your-api.com/me", {
      credentials: "include",
    });

    if (sessionRes.ok) {
      const data = await sessionRes.json();
      const { accessToken, refreshToken, user } = data;

      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        return { accessToken, refreshToken, user };
      }
    }

    // Fallback to email/password login
    if (email && password) {
      const res = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      const { accessToken, refreshToken, user } = data;

      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        return { accessToken, refreshToken, user };
      }
    }

    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch("https://your-api.com/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Refresh token invalid");

    const data = await res.json();
    const newAccessToken = data.accessToken;

    if (newAccessToken) {
      await AsyncStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
}

export async function logout() {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  try {
    await fetch("https://your-api.com/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.warn("Failed to notify server of logout", err);
  }
}
