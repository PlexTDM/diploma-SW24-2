import { TabBar, ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const { theme } = useAppTheme();

  const style = StyleSheet.create({
    tabBar: {
      backgroundColor: theme === "light" ? "white" : "#030712",
      borderColor: theme === "light" ? "white" : "#363636",
      borderTopWidth: 1,
      paddingBottom: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 60,
    },
  });

  return (
    <ThemeView>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
          animation: "shift",
          tabBarStyle: style.tabBar,
          sceneStyle: {
            backgroundColor: theme === "light" ? "white" : "#111827",
            opacity: 1,
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
          name="chatbot"
          options={{
            tabBarLabel: "Chat",
            lazy: false,
          }}
        />
        <Tabs.Screen
          name="blog"
          options={{
            title: "Blog",
            tabBarLabel: "Blog",
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
