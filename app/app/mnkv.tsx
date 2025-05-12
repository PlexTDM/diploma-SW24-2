// mnkv.tsx

import { ThemeView } from '@/components';
import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

const Mnkv = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleNext = () => {
    router.push('/asuult');
  };

  return (
    <ThemeView className="flex-1 justify-end items-center p-6 pb-36">
      <View className="w-full">
        <Text
          className="text-3xl font-bold text-black dark:text-white"
          style={{ paddingLeft: 20 }}
        >
          Hello mnkv
        </Text>
        <Text
          className="text-base mt-4 text-gray-700 dark:text-gray-300"
          style={{ paddingLeft: 20 }}
        >
          Let’s craft your AI-powered personalized meal plan and shopping list - it takes less than a minute to get started!
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        className="w-[90%] h-14 bg-[#136CF1] rounded-full items-center justify-center mt-10"
      >
        <Text className="text-white font-bold text-lg">Continue</Text>
      </TouchableOpacity>
    </ThemeView>
  );
};

export default Mnkv;
