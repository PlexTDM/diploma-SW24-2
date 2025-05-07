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
import { ThemeText, ThemeView } from "@/components";
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
<<<<<<< Updated upstream
    <ThemeView>
      <View className="flex-1 bg-white dark:bg-gray-900 relative justify-center items-center pt-36">
        <BlurEllipse />
        <View className=" bg-white opacity-40 top-44 absolute  dark:bg-black rounded-3xl items-center justify-center w-[330px] h-52 "> </View>
         <View className=" bg-white relative rounded-3xl items-center justify-start w-[370px] h-[580px]">
            <Image
              source={require("@/assets/img/logoLarge.png")}
              style={{ width: "15%", height: "15%" }}
              cachePolicy={"memory-disk"}
              contentFit={"contain"}
              focusable={false}
            />
            <Text className="text-3xl text-center mb-6 font-semibold">Login</Text>
            <View className="w-5/6 mb-4">
              <TextInput
                placeholder="Enter your email"
                autoCapitalize="none"
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-6 py-6 border border-gray-300"
                onChangeText={setUsername}
                placeholderTextColor={theme === "dark" ? "#ccc" : "#89888E"}
              />
            </View>
=======
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

        {/* Email */}
        <View className="w-3/4 mb-4">
          <TextInput
            placeholder="Enter your email"
            autoCapitalize="none"
            className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-6 border border-gray-300"
            onChangeText={setUsername}
            placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
          />
        </View>

        {/* Password */}
        <View className="w-3/4 mb-1">
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

        {/* Forgot Password */}
        <View className="w-3/4 items-end mb-6">
          <TouchableOpacity onPress={() => router.push("/(auth)/ForgotPassword")}>
            <Text className="text-blue-700 text-sm">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <View className="flex-row w-3/4 justify-center mb-4 space-x-4 mt-5">
          <TouchableOpacity
            onPress={logIn}
            className="bg-black rounded-full w-full py-6 items-center"
          >
            <Text className="text-white font-bold">Нэвтрэх</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row justify-center items-center gap-2 mt-5">
          <Text className="bg-gray-300 w-28 h-0.5 flex justify-center items-center"></Text>
          <Text className="text-gray-500">or login with</Text>
          <Text className="bg-gray-300 w-28 h-0.5 flex justify-center items-center"></Text>
        </View>
      </View>

      {/* Register link */}
      <View className="flex-row justify-center bottom-8">
        <Text>Don't have an account? </Text>
        <Text className="text-blue-800" onPress={signUp}>
          Register Now
        </Text>
      </View>
>>>>>>> Stashed changes

            <View className="w-5/6 mb-6 relative">
              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-6 py-6 border border-gray-300 pr-14 "
                onChangeText={setPassword}
                placeholderTextColor={theme === "dark" ? "#ccc" : "#89888E"}
              />
              <Image
                  source={require("@/assets/seen.png")}
                  style={{ width: 20, height:20, position:'absolute', right: 16, top: 20 }}
                  contentFit="contain"
                  className="absolute top-0 right-0"
                />
            </View>


            <View className="flex-row w-5/6 justify-center mb-4 space-x-4 mt-5">
              <TouchableOpacity
                onPress={logIn}
                className="bg-black rounded-full w-full py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">Нэвтрэх</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center gap-2 mt-5">
              <Text className="bg-gray-200 w-28 h-[2px] flex justify-center items-center"></Text>
              <Text className="text-gray-500">or login with</Text>
              <Text className="bg-gray-200 w-28 h-[2px] flex justify-center items-center"></Text>
            </View>
            <View className="flex-row justify-center space-x-4 mt-24 gap-8">
              <TouchableOpacity className="border border-gray-300 rounded-full px-8 py-3">
                <Image
                  source={require("@/assets/socialLogo/google.png")}
                  style={{ width: 25, height: 30 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-gray-300 rounded-full px-8 py-3">
                <Image
                  source={require("@/assets/socialLogo/instagram.png")}
                  style={{ width: 25, height: 30 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-gray-300 rounded-full px-8 py-3">
                <Image
                  source={require("@/assets/socialLogo/apple.png")}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        
        <View className="flex-row justify-center mt-20">
          <Text>Don&apos;t have an account? </Text>
          <Text className="text-blue-700 font-semibold" onPress={signUp}>
            Register Now
          </Text>
        </View>

        {loading && <ActivityIndicator size="large" className="mt-4" />}
      </View>
    </ThemeView>
  );
};

export default Login;

