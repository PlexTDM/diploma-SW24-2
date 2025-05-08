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
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
  loading: true,
  login: async () => null,
  logout: async () => {},
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
