import { ThemeText, ThemeView } from "@/components";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import {Image} from "expo-image";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const handlePress = () => {};
  const LogIn = () => router.push("/(auth)/login");
  return (
    <ThemeView className="flex-1 items-center justify-center">
      <Image
      source={require("@/assets/bluviSignup.png")}
      style={{ width: "55%", height: "25%" }}
      cachePolicy={"memory-disk"}
      contentFit={"contain"}
      focusable={false}
      />
      <Text className="text-black text-xl font-bold">Register</Text>
      <View className="w-3/4 bg-black rounded-full items-center justify-center mb-2 space-x-4 mt-24 p-6">
          <TouchableOpacity>
            <Text className="text-white font-bold text-sm">Continue with Apple</Text>
          </TouchableOpacity>
      </View>
      <View className="w-3/4 rounded-full border border-gray-400 items-center justify-center mb-2 space-x-4 mt-3 p-6">
          <TouchableOpacity>
            <Text className="text-black font-bold text-sm">Continue with Instagram</Text>
          </TouchableOpacity>
      </View>
      <View className="w-3/4 rounded-full border border-gray-400 items-center justify-center mb-2 space-x-4 mt-3 p-6">
          <TouchableOpacity>
            <Text className="text-black font-bold text-sm">Continue with Google</Text>
          </TouchableOpacity>
      </View>
      <Text className="text-gray-500 mt-2">or</Text>
      <View className="w-3/4 rounded-full bg-blue-700 items-center justify-center mb-2 space-x-4 mt-3 p-6">
          <TouchableOpacity>
            <Text className="text-white font-bold text-sm">Continue with Email</Text>
          </TouchableOpacity>
      </View>
      <View className="flex-row justify-center bottom-8 absolute">
          <Text>Already have an account? </Text><Text className="text-blue-800" onPress={LogIn}>Login</Text>
        </View>

    </ThemeView>
  );
};

export default SignUp;
