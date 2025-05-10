import React, { use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useAppTheme } from "@/lib/theme";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ThemeView, BlurEllipse } from "@/components";
import { AuthContext } from "@/context/auth";
const Login = () => {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { login, user, loading } = use(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const logIn = () => {
    login(username, password);
  };

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user, router]);

  const signUp = () => router.push("/(auth)/signup");

  return (
    <ThemeView className="relative">
      <View className="flex-1 bg-white dark:bg-gray-900 relative justify-center items-center pt-24 p-6">
        <BlurEllipse left={-175} top={-400} size={250} />
        <View className="w-full h-full">
          <View className="absolute bg-white dark:bg-black opacity-50 -top-9 left-1/2 w-[330px] h-10 -translate-x-1/2 rounded-t-3xl items-center justify-center z-10" />
          <View className="flex-1 absolute bg-white dark:bg-gray-900 rounded-3xl inset-0 items-center justify-start pt-10 z-20">
            <Image
              source={require("@/assets/img/logoLarge.png")}
              style={{ width: 100, height: 100 }}
              cachePolicy={"memory-disk"}
              contentFit={"contain"}
              focusable={false}
            />
            <Text className="text-3xl text-center mb-6 font-semibold">
              Login
            </Text>
            <View className="w-5/6 mb-4">
              <View className="mb-4">
                <TextInput
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-6 py-5 border border-gray-300 text-lg"
                  onChangeText={setUsername}
                  placeholderTextColor={theme === "dark" ? "#ccc" : "#89888E"}
                />
              </View>

              <View className="mb-2 relative border flex-row border-gray-300 rounded-full overflow-hidden">
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={passwordHidden}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="bg-white dark:bg-gray-700 text-black flex-1 dark:text-white px-6 py-5 text-lg"
                  onChangeText={setPassword}
                  placeholderTextColor={theme === "dark" ? "#ccc" : "#89888E"}
                />
                <Pressable
                  className="w-[50px] h-full"
                  android_ripple={{
                    color: "#00000020",
                    radius: 25,
                  }}
                  onPress={() => setPasswordHidden(!passwordHidden)}
                >
                  <Image
                    source={require("@/assets/seen.png")}
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      right: 16,
                      top: 20,
                    }}
                    contentFit="contain"
                  />
                </Pressable>
              </View>

              {/* Forgot Password */}
              <View className="items-end">
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/ForgotPassword")}
                >
                  <Text className="text-blue-700 text-sm">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center mb-4 space-x-4 mt-2">
                <TouchableOpacity
                  onPress={logIn}
                  className="bg-black rounded-full w-full py-4 items-center"
                >
                  <Text className="text-white font-semibold text-lg">
                    Нэвтрэх
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center w-full items-center gap-2">
                <View className="bg-gray-300 h-[1px] flex-1" />
                <Text className="text-gray-500">or login with</Text>
                <View className="bg-gray-300 h-[1px] flex-1" />
              </View>
              <View className="flex-row justify-center space-x-4 mt-4 gap-8">
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
            <View className="flex-row justify-center mt-8">
              <Text>Don&apos;t have an account? </Text>
              <Text className="text-blue-700 font-semibold" onPress={signUp}>
                Register Now
              </Text>
            </View>
          </View>
        </View>

        {loading && <ActivityIndicator size="large" className="mt-4" />}
      </View>
    </ThemeView>
  );
};

export default Login;
