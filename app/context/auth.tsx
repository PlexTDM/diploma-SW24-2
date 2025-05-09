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
  login: (email?: string, password?: string) => Promise<LoginResponse | null>;
  logout: () => Promise<void>;
  register: (formData: registerFormType) => Promise<void>;
};

const api = process.env.EXPO_PUBLIC_API_URL as string;

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  loading: true,
  login: async () => null,
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
    await AsyncStorage.removeItem("token");
    logout();
    setUser(null);
    setLoggedIn(false);
  };

  const registerUser = async (formData: registerFormType) => {
    setLoading(true);
    console.log(formData);

    const data = await fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res: any) => {
        if (!res.ok) {
          return res.text().then((text) => {
            console.log("Error response:", text);
            throw new Error("Registration failed");
          });
        }
        return res.json();
      })
      .catch((error: any) => {
        console.error("Error:", error);
        throw error;
      });
    setUser(data);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login,
        logout: logoutUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
