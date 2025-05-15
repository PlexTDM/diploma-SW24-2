import { AuthContext } from "@/context/auth";
import { Stack } from "expo-router/stack";
import { use } from "react";
import { useAppTheme } from "@/lib/theme";
const RootLayout = () => {
  const { loggedIn } = use(AuthContext);
  const { theme } = useAppTheme();
  // const loggedIn = true;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme === "light" ? "white" : "#111827",
        },
      }}
    >
      <Stack.Protected guard={loggedIn}>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!loggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
