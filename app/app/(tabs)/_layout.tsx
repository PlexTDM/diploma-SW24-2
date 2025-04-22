import { Tabs } from "expo-router";
import { useAppTheme } from "@/lib/theme";
import { StyleSheet } from "react-native";
import { ThemeView, TabBar } from "@/components";

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
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarShowLabel: false,
            lazy: false,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            lazy: false,
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Tabs>
    </ThemeView>
  );
}
