import AsyncStorage from "@react-native-async-storage/async-storage";
const api = process.env.EXPO_PUBLIC_API_URL as string;

if (!api) {
  throw new Error("API URL is not set");
}

export async function login(
  email?: string,
  password?: string
): Promise<LoginResponse | null> {
  try {
    if (email && password) {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.log(await res.text());
        // throw new Error("Login failed");
        return null;
      }
      const data = await res.json();
      console.log(data);
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
    const res = await fetch(`${api}/auth/generateNewToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  const accessToken = await AsyncStorage.getItem("accessToken");
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  try {
    await fetch(`${api}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.warn("Failed to notify server of logout", err);
  }
}
