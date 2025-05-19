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
        initialRouteName="index"
      >
        <Tabs.Screen
          name="index"
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
            animation: "fade",
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
