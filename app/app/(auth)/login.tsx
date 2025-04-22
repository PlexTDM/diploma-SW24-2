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
    <View className="flex-1 items-center justify-start bg-white dark:bg-black p-6">
      <Text className="text-[120px] text-center mb-6">🏃</Text>

      <View className="w-3/4 mb-4">
        <Text className="text-black dark:text-white mb-1">Username</Text>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2"
          onChangeText={setUsername}
          placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
        />
      </View>

      <View className="w-3/4 mb-6">
        <Text className="text-black dark:text-white mb-1">Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2"
          onChangeText={setPassword}
          placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
        />
      </View>

      <View className="flex-row w-3/4 justify-center mb-4 space-x-4">
        <TouchableOpacity
          onPress={logIn}
          className="bg-sky-400 rounded-lg w-2/5 py-2 items-center"
        >
          <Text className="text-white font-bold">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signUp}
          className="bg-purple-600 rounded-lg w-2/5 py-2 items-center"
        >
          <Text className="text-white font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" className="mt-4" />}
    </View>
  );
};

export default Login;
