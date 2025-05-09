import { View, Text, Image, Pressable } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'expo-router';
import { Heart, MessageCircle, Bookmark } from 'lucide-react-native';
import { useBlogStore, Post } from '@/stores/blogStore';
import Animated, { useAnimatedStyle, withSequence, withTiming, useSharedValue } from 'react-native-reanimated';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { currentUser, toggleLike, toggleBookmark } = useBlogStore();
  const isLiked = post.likes.includes(currentUser.id);
  const isBookmarked = post.isBookmarked;
  
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handleLike = () => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    
    toggleLike(post.id);
  };
  
  const handleBookmark = () => {
    toggleBookmark(post.id);
  };
  
  const navigateToDetail = () => {
    router.push(`/post/${post.id}`);
  };
  
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <Pressable 
      className="bg-white border border-gray-300 dark:bg-slate-800 p-10 rounded-3xl mb-5"
      onPress={navigateToDetail}
    >
      <View className="flex-row items-center mb-3">
        <Image 
          source={{ uri: post.author.avatar }} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="font-bold text-neutral-800 dark:text-gray-100">{post.author.name}</Text>
          <Text className="text-neutral-500 text-xs dark:text-gray-400">{timeAgo}</Text>
        </View>
      </View>
      
      <Text className="text-lg font-bold text-neutral-800 mb-2 dark:text-gray-100">{post.title}</Text>
      <Text className="text-neutral-700 mb-3 dark:text-gray-300" numberOfLines={3}>
        {post.content}
      </Text>
      
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          className="w-full aspect-video rounded-lg mb-3"
          resizeMode="cover"
        />
      )}
      
      <View className="flex-row gap-12 items-center">
        <Pressable 
          className="flex-row items-center" 
          onPress={handleLike}
        >
          <Animated.View style={animatedStyle}>
            <Heart 
              size={20} 
              color={isLiked ? "#FF7256" : "#6B7280"}
              fill={isLiked ? "#FF7256" : "transparent"}
            />
          </Animated.View>
          <Text className="ml-1 text-neutral-600">{post.likes.length}</Text>
        </Pressable>
        
        <Pressable 
          className="flex-row items-center" 
          onPress={navigateToDetail}
        >
          <MessageCircle size={20} color="#6B7280" />
          <Text className="ml-1 text-neutral-600">{post.comments.length}</Text>
        </Pressable>
        
        <Pressable onPress={handleBookmark}>
          <Bookmark
            size={20}
            color={isBookmarked ? "#3B82F6" : "#6B7280"}
            fill={isBookmarked ? "#3B82F6" : "transparent"}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}