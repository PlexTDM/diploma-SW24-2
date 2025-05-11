import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useColorScheme } from 'nativewind';

export default function Meal() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedTab, setSelectedTab] = useState<'recent' | 'favorites'>('recent');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    'English breakfast': false,
    'Egg omlete': false,
  });

  const meals = [
    { date: 'Өнөөдөр', title: 'English breakfast', calories: '120/304 kcal' },
    { date: 'Өчигдөр', title: 'Egg omlete', calories: '120/304 kcal' },
  ];

  const toggleFavorite = (title: string) => {
    setFavorites((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderMealCard = (title: string, calories: string) => (
    <View key={title} className="border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-4 mb-4 flex-row justify-between items-center">
      <View>
        <Text className="font-bold text-lg text-black dark:text-white">{title}</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">{calories}</Text>
      </View>
      <Pressable onPress={() => toggleFavorite(title)}>
        {favorites[title] ? (
          <MaterialIcons name="favorite" size={24} color="#EF4444" />
        ) : (
          <Feather name="heart" size={22} color={isDark ? 'white' : 'black'} />
        )}
      </Pressable>
    </View>
  );

  const scannerImages = [
    { label: 'Barcode', source: require('@/assets/barcode.png') },
    { label: 'Menu', source: require('@/assets/Menu.png') },
    { label: 'Fridge', source: require('@/assets/fridge.png') },
  ];

  return (
    <View className="p-6 pt-8 bg-white dark:bg-black flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Feather name="plus" size={20} color={isDark ? 'white' : 'black'} />
        <Text className="font-bold text-xl text-black dark:text-white">Breakfast</Text>
        <Pressable
          onPress={() => router.push('/(tabs)/blog')}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          <Text className="font-bold text-lg text-[#758FF6]">Done</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View className="flex-row items-center mt-5">
        <View className="flex-row flex-1 items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-900">
          <View className="w-8 h-8 rounded-full justify-center items-center mr-2">
            <Feather name="search" size={18} color="#666" />
          </View>
          <TextInput
            placeholder="Search for food"
            placeholderTextColor={isDark ? '#aaa' : '#888'}
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={false}
            numberOfLines={1}
            className="flex-1 py-1 text-black dark:text-white"
          />
        </View>
        <Pressable className="ml-3 w-12 h-12 rounded-full bg-black dark:bg-gray-600 justify-center items-center border border-gray-400 dark:border-gray-500">
          <Feather name="mic" size={16} color={isDark ? 'black' : 'white'} />
        </Pressable>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between items-center mt-5">
        <Pressable className="p-3 w-[47%] border border-gray-300 dark:border-gray-600 rounded-full justify-center items-center">
          <Text className="text-base font-bold text-black dark:text-white">Гараар оруулах</Text>
        </Pressable>
        <Pressable className="p-3 w-[47%] border border-gray-300 dark:border-gray-600 rounded-full justify-center items-center">
          <Text className="text-base font-bold text-black dark:text-white">Орц оруулах</Text>
        </Pressable>
      </View>

      {/* Scan Button */}
      <Pressable className="w-full p-3 bg-[#136CF1] rounded-full justify-center items-center mt-5">
        <Text className="text-base text-white">Scan your meals</Text>
      </Pressable>

      {/* More Scanners */}
      <Text className="text-lg font-bold mt-6 text-black dark:text-white">More Scanners</Text>
      <View className="flex-row items-center mt-5 gap-4">
        {scannerImages.map((item, i) => (
          <View className="justify-center items-center" key={i}>
            <View className="w-20 h-20 bg-blue-200 border border-[#4C91F9] rounded-2xl justify-center items-center">
              <Image source={item.source} style={{ width: '60%', height: '60%' }} />
            </View>
            <Text className="mt-1 font-bold text-black dark:text-white text-sm">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View className="flex-row justify-center mt-8 mb-2 space-x-8">
        {['Сүүлд нэмэгдсэн', 'Таалагдсан'].map((tab, index) => {
          const active = (selectedTab === 'recent' && index === 0) || (selectedTab === 'favorites' && index === 1);
          return (
            <Pressable
              key={index}
              className="flex-1 items-center"
              onPress={() => setSelectedTab(index === 0 ? 'recent' : 'favorites')}
            >
              <Text className={`text-lg font-bold ${active ? 'text-blue-500' : 'text-black dark:text-white'}`}>
                {tab}
              </Text>
              {active && <View className="h-1 w-full bg-blue-500 mt-2 rounded-full" />}
            </Pressable>
          );
        })}
      </View>

      {/* Meals */}
      <View className="mt-3">
        {['Өнөөдөр', 'Өчигдөр'].map((day) => {
          const dayMeals = meals.filter((meal) => meal.date === day);
          const visibleMeals =
            selectedTab === 'recent' ? dayMeals : dayMeals.filter((meal) => favorites[meal.title]);

          return visibleMeals.length ? (
            <View key={day} className="mt-4">
              <Text className="text-gray-500 dark:text-gray-400 mb-2 text-sm">{day}</Text>
              {visibleMeals.map((meal) => renderMealCard(meal.title, meal.calories))}
            </View>
          ) : null;
        })}
      </View>
    </View>
  );
}