import { ThemeView } from '@/components'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { TextInput } from 'react-native'
import { Pressable } from 'react-native'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'

export default function create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    
    
    router.replace('/(tabs)/chatbot');
  };

  const isSubmitDisabled = !title.trim() || !content.trim();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between p-4 border-b border-neutral-100">
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="black" />
        </Pressable>
        <Text className="text-lg font-bold text-neutral-800">Create Post</Text>
        <Pressable 
          className={`py-2 px-4 rounded-full ${isSubmitDisabled ? 'bg-neutral-200' : 'bg-primary-500'}`}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}>
          <Text className={`${isSubmitDisabled ? 'text-neutral-500' : 'text-black'} font-medium`}>Post</Text>
        </Pressable>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <TextInput
          className="text-xl font-bold text-neutral-800 mb-4"
          placeholder="Title"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          multiline
        />
        
        <TextInput
          className="text-base text-neutral-700 min-h-40"
          placeholder="What's on your mind?"
          placeholderTextColor="#9CA3AF"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
        
        {imageUrl ? (
          <View className="mt-4 rounded-lg overflow-hidden">
            <Pressable 
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
              onPress={() => setImageUrl('')}>
            </Pressable>
          </View>
        ) : (
          <Pressable
            className="mt-4 border-2 border-dashed border-neutral-300 rounded-lg p-6 items-center"
            onPress={() => {
              setImageUrl('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
            }}>
            <Feather name="plus" size={32} color="#9CA3AF" />
            <Text className="mt-2 text-neutral-500">Add an image</Text>
            <Text className="text-xs text-neutral-400 mt-1">
              (For this demo, we'll use a sample image)
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}
