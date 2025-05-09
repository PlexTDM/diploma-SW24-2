import { View, Text, Image, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useBlogStore } from '@/stores/blogStore';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Heart, MessageCircle, Share, Bookmark } from 'lucide-react-native';
import CommentItem from '@/components/CommentItem';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { 
    getPostById, 
    currentUser, 
    toggleLike, 
    addComment, 
    toggleBookmark 
  } = useBlogStore();
  const post = getPostById(id as string);
  const [comment, setComment] = useState('');
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Post not found</Text>
      </View>
    );
  }

  const isLiked = post.likes.includes(currentUser.id);
  const isBookmarked = post.isBookmarked;
  
  const handleLike = () => {
    toggleLike(post.id);
  };
  
  const handleBookmark = () => {
    toggleBookmark(post.id);
  };
  
  const handleComment = () => {
    if (!comment.trim()) return;
    
    addComment(post.id, comment);
    setComment('');
  };
  
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white p-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={{ paddingTop: insets.top }}
    >
      <View className="p-4 border-b border-neutral-100 flex-row items-center">
        <Pressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1F2937" />
        </Pressable>
        <Text className="text-xl font-bold text-neutral-800">Post</Text>
      </View>
      
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className='border border-gray-300 rounded-3xl p-7'>
          <View className="flex-row items-center mb-3">
            <Image 
              source={{ uri: post.author.avatar }} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <View>
              <Text className="font-bold text-neutral-800">{post.author.name}</Text>
              <Text className="text-neutral-500 text-xs">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Text>
            </View>
          </View>
          
          <Text className="text-xl font-bold text-neutral-800 mb-2">{post.title}</Text>
          <Text className="text-base text-neutral-700 mb-4 leading-6">{post.content}</Text>
          
          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              className="w-full aspect-video rounded-lg mb-4"
              resizeMode="cover"
            />
          )}
          
          <View className="flex-row justify-between items-center py-3">
            <Pressable 
              className="flex-row items-center" 
              onPress={handleLike}
            >
              <Heart 
                size={20} 
                color={isLiked ? "#FF7256" : "#6B7280"}
                fill={isLiked ? "#FF7256" : "transparent"}
              />
              <Text className="ml-1 text-neutral-600">{post.likes.length}</Text>
            </Pressable>
            
            <View className="flex-row items-center">
              <MessageCircle size={20} color="#6B7280" />
              <Text className="ml-1 text-neutral-600">{post.comments.length}</Text>
            </View>
            
            <Pressable className="flex-row items-center">
              <Share size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable onPress={handleBookmark}>
              <Bookmark
                size={20}
                color={isBookmarked ? "#3B82F6" : "#6B7280"}
                fill={isBookmarked ? "#3B82F6" : "transparent"}
              />
            </Pressable>
          </View>
          </View>
          
          <Text className="font-bold text-neutral-800 mt-4 mb-2">
            Comments ({post.comments.length})
          </Text>
          
          {post.comments.map((comment) => (
            <Animated.View 
              key={comment.id} 
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <CommentItem comment={comment} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      
      <View className="p-4 bottom-7 flex-row">
        <Image 
          source={{ uri: currentUser.avatar }} 
          className="w-8 h-8 rounded-full mr-3"
        />
        <TextInput
          className="flex-1 bg-neutral-100 rounded-full px-4 py-2 mr-2 text-neutral-700"
          placeholder="Add a comment..."
          placeholderTextColor="#9CA3AF"
          value={comment}
          onChangeText={setComment}
        />
        <Pressable 
          className={`justify-center px-4 ${!comment.trim() ? 'opacity-50' : ''}`}
          onPress={handleComment}
          disabled={!comment.trim()}
        >
          <Text className="text-primary-500 font-bold">Post</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}