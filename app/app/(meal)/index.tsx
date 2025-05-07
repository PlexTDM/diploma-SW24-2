import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function meal() {
    
  const router = useRouter()
  return (
    <View className='p-8 items center bg-white'>
      <View className='flex-row justify-between items-center'>
        <Feather name='plus' size={20} color='black' />
        <Text className='font-bold text-xl'>Breakfast</Text>
        <Pressable onPress={() => router.push('/(tabs)/blog')} className='p-2 rounded-full bg-gray-200 dark:bg-gray-800'>
          <Text className='font-bold text-lg text-[#758FF6]'>Done</Text>
        </Pressable>
      </View>
      <View className='flex-row justify-between items-center mt-8'>
        <View className='w-[85%] h-12 border border-gray-400 rounded-full flex-row items-center gap-5 px-4'>
          <Feather name='search' size={20} color='gray' />
          <Text className='text-gray-400'>Search for food</Text>
        </View>
        <View className='justify-center items-center w-12 h-12 bg-black rounded-full'>
          <Feather name='mic' size={20} color='white' />
        </View>
      </View>
      <View className='flex-row justify-between items-center mt-8'>
        <Pressable onPress={() => router.push('/asuult')} className='p-4 w-[47%] border border-gray-400 rounded-full justify-center items-center'><Text className='text-lg font-bold'>Гараар оруулах</Text></Pressable>
        <Pressable className='p-4 w-[47%] border border-gray-400 rounded-full justify-center items-center'><Text className='text-lg font-bold'>Орц оруулах</Text></Pressable>
      </View>
      <Pressable className='w-full p-4 bg-[#136CF1] rounded-full justify-center items-center mt-8'><Text className='text-lg text-white'>Scan your meals</Text></Pressable>
      <Text className='text-xl font-bold mt-8'>More Scanners</Text>
      <View className='flex-row items-center mt-8 gap-6'>
        <View className='justify-center items-center'>
          <View className='w-24 h-24 bg-blue-200 border border-[#4C91F9] rounded-3xl'></View>
          <Text className='mt-2 font-bold'>Barcode</Text>
        </View>
        <View className='justify-center items-center'>
          <View className='w-24 h-24 bg-blue-200 border border-[#4C91F9] rounded-3xl'></View>
          <Text className='mt-2 font-bold'>Menu</Text>
        </View>
        <View className='justify-center items-center'>
          <View className='w-24 h-24 bg-blue-200 border border-[#4C91F9] rounded-3xl'></View>
          <Text className='mt-2 font-bold'>Fridge</Text>
        </View>
      </View>
    </View>
  )
}