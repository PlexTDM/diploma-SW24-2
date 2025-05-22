import { View, Text, Pressable, TextInput } from "react-native";
import { useState, useContext, use } from "react";
import { useNavigation, useRouter } from "expo-router";
import { ThemeView, ThemeText } from "@/components";
import { Image } from "expo-image";
import { useAppTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/language";
import { Button, Icon } from "react-native-paper";
import { AuthContext } from "@/context/auth";

export default function Edit() {
  const { language } = useLanguage();
  const { theme } = useAppTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = use(AuthContext);

  const [name, setName] = useState(user?.username || ""); // ✅ анхны утгыг оруулсан

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.push("/");
    }
  };

  // const handleSave = () => {
  //   setUser({ ...user, username: name });
  //   router.back();
  // };

  return (
    <ThemeView className="pt-4 px-8 flex-1 justify-between">
      <View>
        {/* Header */}
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
            Edit
          </ThemeText>
          <Pressable
            className="border-2 border-gray-200 dark:border-gray-700 p-2 rounded-full"
            onPress={handleBack}
          >
            <Icon
              source="cog-outline"
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </Pressable>
        </View>
        {/* Profile image */}
        <Text className="mt-8 text-lg text-gray-400 dark:text-gray-400">
          Profile picture
        </Text>
        <View className="flex-row justify-center relative mt-4">
          <View className="relative p-2">
            <Image
              source={
                user?.image
                  ? { uri: user.image }
                  : require("@/assets/img/profile.png")
              }
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
              }}
            />
            <View className="border-2 border-white bg-black p-2 rounded-full absolute z-10 right-0 bottom-0">
              <Icon source="pencil" size={20} color="white" />
            </View>
          </View>
        </View>

        {/* Name input */}
        <Text className="mt-8 text-lg text-gray-400 dark:text-gray-400">
          Full name
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-full text-black dark:text-white mt-4"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={{ fontSize: 18 }}
        />
      </View>

      {/* Save button */}
      <Pressable
        // onPress={handleSave}
        className=" bg-blue-500 py-4 rounded-full mb-20"
      >
        <Text className="text-white text-center text-xl font-semibold">
          Save
        </Text>
      </Pressable>
    </ThemeView>
  );
}
