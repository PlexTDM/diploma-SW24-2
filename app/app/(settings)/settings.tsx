import React, { use } from "react";
import { View, Pressable, Switch, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { ThemeView, ThemeText } from "@/components";
import { Image } from "expo-image";
import { useAppTheme } from "@/lib/theme";
import { useLanguage, languages } from "@/lib/language";
import { Button, Icon } from "react-native-paper";
import { AuthContext } from "@/context/auth";
import { SettingsItem } from "@/components/SettingsItem";

export default function Settings() {
  const { user, logout } = use(AuthContext);
  const { theme, setTheme } = useAppTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();
  const toggleLang = () => {
    const newLang = language === "en" ? "mn" : "en";
    setLanguage(newLang);
  };

  const isDark = theme === "dark";
  const toggleSwitch = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.push("/");
    }
  };

  return (
    <ThemeView className="pt-8 px-10 flex-1">
      <View className="flex-row items-center justify-between w-full">
        <View className="border-2 border-gray-200 dark:border-gray-700 rounded-full">
          <Button mode="text" rippleColor="#ddd" onPress={handleBack}>
            <Icon
              source="chevron-left"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </Button>
        </View>
        <ThemeText className="text-2xl text-center font-semibold">
          {languages[language].settings.title}
        </ThemeText>
        <Pressable
          className="border-2 border-gray-200 dark:border-gray-700 p-2 rounded-full"
          onPress={handleBack}
        >
          <Icon
            source="account-outline"
            size={25}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </Pressable>
      </View>

      {/* Account section */}
      <ThemeText className="text-xl font-semibold mt-8">Account</ThemeText>
      <Pressable
        className="flex-row mt-4 items-center justify-between"
        onPress={() => router.push("/(settings)/Edit")}
      >
        <View className="flex-row gap-4 items-center flex-1">
          <Image
            source={
              user?.image
                ? { uri: user.image }
                : require("@/assets/img/profile.png")
            }
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
            }}
          />
          <ThemeText className="text-xl font-semibold">
            {user?.username}
          </ThemeText>
          {/* <ThemeText className="text-lg">Profile</ThemeText> */}
        </View>
        <Icon
          source="chevron-right"
          size={25}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Pressable>

      {/* Settings section */}
      <ThemeText className="text-xl font-semibold mt-8">Settings</ThemeText>

      {/* Notifications */}
      <SettingsItem
        icon="bell-outline"
        title="Notifications"
        onPress={() => router.push("/(settings)/Notifications")}
      />

      {/* Close Friends */}
      <SettingsItem
        icon="account-group-outline"
        title="Close Friends"
        onPress={() => router.push("/(settings)/CloseFriends")}
      />

      {/* Privacy */}
      <SettingsItem
        icon="lock-outline"
        title="Privacy"
        onPress={() => router.push("/(settings)/Privacy")}
      />

      {/* Language */}
      <SettingsItem
        icon="translate"
        title="Language"
        showChevron={false}
        rightElement={
          <Pressable onPress={toggleLang}>
            <View className="flex-row items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <Text className="text-black dark:text-white text-lg">
                {language === "mn" ? "Монгол" : "English"}
              </Text>
            </View>
          </Pressable>
        }
      />

      {/* Dark Mode Switch */}
      <SettingsItem
        icon="moon-waning-crescent"
        title="Dark Mode"
        showChevron={false}
        rightElement={
          <Switch
            value={isDark}
            onValueChange={toggleSwitch}
            trackColor={{ false: "#ccc", true: "#93c5fd" }}
            thumbColor={isDark ? "#1d4ed8" : "#f4f3f4"}
          />
        }
      />

      {/* logout */}
      {user && (
        <SettingsItem
          icon="logout"
          title="Logout"
          showChevron={false}
          onPress={() => {
            logout();
            router.replace("/(tabs)");
          }}
        />
      )}
    </ThemeView>
  );
}
