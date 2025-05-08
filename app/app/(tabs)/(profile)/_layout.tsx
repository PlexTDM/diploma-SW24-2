import { AuthContext } from "@/context/auth";
import { Stack } from "expo-router/stack";
import { use } from "react";

const RootLayout = () => {
  // const { loggedIn } = use(AuthContext);
  const loggedIn = true;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
