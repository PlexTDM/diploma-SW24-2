import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useAppTheme } from "@/lib/theme";
import { useRouter } from "expo-router";
import { BlurEllipse } from "@/components";
import { Image } from "expo-image";

const Login = () => {
  const router = useRouter();
  const { theme } = useAppTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // router.push("Home");
  };

  const signUp = () => router.push("/(auth)/signup");

  return (
    <View className="flex-1 bg-white dark:bg-black relative justify-center items-center pt-36">
      <BlurEllipse />
      <View className="flex-1 bg-white rounded-3xl items-center justify-start w-96 h-96">
        <Image
          source={require("@/assets/img/logoLarge.png")}
          style={{ width: "15%", height: "15%" }}
          cachePolicy={"memory-disk"}
          contentFit={"contain"}
          focusable={false}
        />
        <Text className="text-3xl text-center mb-6 font-bold">Login</Text>
        <View className="w-3/4 mb-4">
          <TextInput
            placeholder="Enter your email"
            autoCapitalize="none"
            className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-6 border border-gray-300"
            onChangeText={setUsername}
            placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
          />
        </View>

        <View className="w-3/4 mb-6">
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-6 border border-gray-300"
            onChangeText={setPassword}
            placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
          />
        </View>

        <View className="flex-row w-3/4 justify-center mb-4 space-x-4 mt-5">
          <TouchableOpacity
            onPress={logIn}
            className="bg-black rounded-full w-full py-6 items-center"
          >
            <Text className="text-white font-bold">Нэвтрэх</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center gap-2 mt-5">
          <Text className="bg-gray-300 w-28 h-0.5 flex justify-center items-center"></Text>
          <Text className="text-gray-500">or login with</Text>
          <Text className="bg-gray-300 w-28 h-0.5 flex justify-center items-center"></Text>
        </View>
        {/* <View className="flex-row gap-4 justify-center mt-5 h-26">
          <TouchableOpacity className="border border-gray-300 rounded-full h-14 w-14">
              <Image
              source={require("@/assets/google-logo.png")}
              style={{ width: "100%", height: "100%" }}
              cachePolicy={"memory"}
              contentFit={"contain"}
              focusable={false}
              />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 rounded-full h-14 w-14 p-1">
              <Image
              source={require("@/assets/instagram-logo.png")}
              style={{ width: "100%", height: "100%" }}
              cachePolicy={"memory"}
              contentFit={"contain"}
              focusable={false}
              />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 rounded-full h-14 w-14 p-1">
              <Image
              source={require("@/assets/instagram-logo.png")}
              style={{ width: "100%", height: "100%" }}
              cachePolicy={"memory"}
              contentFit={"contain"}
              focusable={false}
              />
          </TouchableOpacity>
        </View> */}
        {loading && <ActivityIndicator size="large" className="mt-4" />}
      </View>
      <View className="flex-row justify-center bottom-8">
        <Text>Don&apos;t have an account? </Text>
        <Text className="text-blue-800" onPress={signUp}>
          Register Now
        </Text>
      </View>

      {loading && <ActivityIndicator size="large" className="mt-4" />}
    </View>
  );
};

export default Login;
