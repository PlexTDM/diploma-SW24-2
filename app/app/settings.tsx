import { View, Pressable, Switch, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { ThemeView, ThemeText } from "@/components";
import { Image } from "expo-image";
import { useAppTheme } from "@/lib/theme";
import { useLanguage, languages } from "@/lib/language";
import { Button, Icon } from "react-native-paper";
import { AuthContext } from "@/context/auth";
import { use } from "react";

export default function Settings() {
  const { user } = use(AuthContext);
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
        onPress={() => router.push("/settings/Edit")}
      >
        <ThemeView className="flex-row gap-4 items-center">
          <Image
            source={require("@/assets/img/profile.png")}
            style={{ width: 61, height: 60 }}
          />
          <ThemeView>
            <ThemeText className="text-xl font-semibold">
              {user?.username}
            </ThemeText>
            <ThemeText className="text-lg">Profile</ThemeText>
          </ThemeView>
        </ThemeView>
        <Icon
          source="chevron-right"
          size={25}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Pressable>

      {/* Settings section */}
      <ThemeText className="text-xl font-semibold mt-8">Settings</ThemeText>

      {/* Notifications */}
      <Pressable
        className="flex-row mt-8 items-center justify-between"
        onPress={() => router.push("/settings/Notifications")}
      >
        <View className="flex-row items-center gap-8">
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
            <Icon
              source="bell-outline"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
          <ThemeText className="text-xl font-semibold">Notifications</ThemeText>
        </View>
        <Icon
          source="chevron-right"
          size={25}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Pressable>

      {/* Close Friends */}
      <Pressable
        className="flex-row mt-8 items-center justify-between"
        onPress={() => router.push("/settings/CloseFriends")}
      >
        <View className="flex-row items-center gap-8">
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
            <Icon
              source="account-group-outline"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
          <ThemeText className="text-xl font-semibold">Close Friends</ThemeText>
        </View>
        <Icon
          source="chevron-right"
          size={25}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Pressable>

    
      {/* Privacy */}
      <Pressable
        className="flex-row mt-8 items-center justify-between"
        onPress={() => router.push("/settings/Privacy")}
      >
        <View className="flex-row items-center gap-8">
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
            <Icon
              source="lock-outline"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
          <ThemeText className="text-xl font-semibold">Privacy</ThemeText>
        </View>
        <Icon
          source="chevron-right"
          size={25}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Pressable>

       {/* Language */}
      <Pressable
        className="flex-row mt-8 items-center justify-between"
      >
        <View className="flex-row items-center gap-8">
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
            <Icon
              source="translate"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
          <ThemeText className="text-xl font-semibold">Language</ThemeText>
        </View>
        <Pressable onPress={toggleLang} >
          <View className="flex-row items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {language === "mn" ? (
              <>
                <Text className="text-black dark:text-white text-lg">Монгол</Text>
              </>
            ) : (
              <>
                <Text className="text-black dark:text-white text-lg">English</Text>
              </>
            )}
          </View>
        </Pressable>
      </Pressable>


      {/* Dark Mode Switch */}
      <Pressable className="flex-row mt-8 items-center justify-between">
        <View className="flex-row items-center gap-8">
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-full">
            <Icon
              source="moon-waning-crescent"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </View>
          <ThemeText className="text-xl font-semibold">Dark Mode</ThemeText>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#ccc", true: "#93c5fd" }}
          thumbColor={isDark ? "#1d4ed8" : "#f4f3f4"}
        />
      </Pressable>
    </ThemeView>
  );
}
