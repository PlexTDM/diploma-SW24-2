import { TabBar, ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { theme } = useAppTheme();

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
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            tabBarLabel: "blogs",
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            tabBarLabel: "stats",
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </ThemeView>
  );
}
