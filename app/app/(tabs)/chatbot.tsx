import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useBlogStore } from '@/stores/blogStore';
import PostCard from '@/components/PostCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Search } from 'lucide-react-native';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeView } from '@/components';
import { useEffect } from 'react';
export default function FeedScreen() {
  const { posts } = useBlogStore();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  if (!posts || posts.length === 0) {
  return (
      <View className="flex-1 bg-white justify-center items-center" 
        style={{ paddingTop: insets.top }}>
        <Text className="text-neutral-500 font-medium text-lg">No posts yet</Text>
        <Text className="text-neutral-400 text-center mt-2 px-10">
          Create a new post or wait for others to share their thoughts
        </Text>
      </View>
    );
  }
const router = useRouter();
  return (
    <ThemeView className="flex-1 bg-white p-6">
      <View className='flex-row w-full border-2 justify-start items-center border-gray-300 rounded-full p-2 mb-4 h-14 pl-3 gap-2'>
        <Search size={18} color="#d1d5db" />
        <TextInput
          placeholder="Search posts"
        />
      </View>
      <Pressable onPress={() => router.push("/(blog)/create")} className='w-20 h-20 bg-blue-500 rounded-full justify-center items-center'>
        <Feather name='plus' size={20} color='white' />
      </Pressable>
      <FlatList
       data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className='mt-6'
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
            colors={['#3B82F6']}
          />
        }
      />
    </ThemeView>
  );
}
