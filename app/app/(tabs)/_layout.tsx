import { TabBar, ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const { theme } = useAppTheme();

  const router = useRouter();

  useEffect(() => {
    router.replace("/(tabs)/home");
  }, [router]);
  return (
    <ThemeView>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: "shift",
          sceneStyle: {
            backgroundColor: theme === "light" ? "white" : "#111827",
          },
        }}
        initialRouteName="home"
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            lazy: false,
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            tabBarLabel: "blogs",
            lazy: false,
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            tabBarLabel: "stats",
            lazy: false,
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            lazy: false,
          }}
        />
      </Tabs>
    </ThemeView>
  );
}
