import { ThemeView } from "@/components";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
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
      <Text className="text-black text-2xl font-semibold mt-3">Register</Text>
      <View className="w-3/4 bg-black rounded-full items-center justify-wtart mb-2 space-x-4 mt-24 p-5 flex-row ">
        <View className="mr-14 mb-1 ml-2">
          <Image
            source={require("@/assets/socialLogo/apple_white.png")}
            style={{ width: 28, height: 28 }}
            contentFit="contain"
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text className="text-white font-semibold text-[14px]">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-3/4 rounded-full border border-gray-400 items-center justify-start mb-2 space-x-4 mt-3 p-5 flex-row">
        <View className="mr-14 ml-2">
          <Image
            source={require("@/assets/socialLogo/instagram.png")}
            style={{ width: 25, height: 30 }}
            contentFit="contain"
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text className="text-black font-semibold text-[14px]">
              Continue with Instagram
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-3/4 rounded-full border border-gray-400 items-center justify-start mb-2 space-x-4 mt-3 p-5 flex-row">
        <View className="mr-14 ml-2">
          <Image
            source={require("@/assets/socialLogo/google.png")}
            style={{ width: 25, height: 30 }}
            contentFit="contain"
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text className="text-black font-semibold text-[14px]">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-gray-500 mt-2">or</Text>
      <View className="w-3/4 rounded-full bg-blue-700 items-center justify-center mb-2 space-x-4 mt-3 p-7">
        <TouchableOpacity>
          <Text className="text-white font-semibold text-md">
            Continue with Email
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-24">
        <Text>Already have an account? </Text>
        <Text className="text-blue-700 font-semibold" onPress={LogIn}>
          Login
        </Text>
      </View>
    </ThemeView>
  );
};

export default SignUp;
