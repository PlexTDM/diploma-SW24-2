import { View, Text, Image } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react-native';
import { Comment, useBlogStore } from '@/stores/blogStore';
import { ThemeView } from '@/components';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { currentUser } = useBlogStore();
  const isLiked = comment.likes.includes(currentUser.id);
  
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
  
  return (
    <ThemeView className="mb-4 p-2 border-b border-gray-200">
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center'>
        <Image 
          source={{ uri: comment.author.avatar }} 
          className="w-16 h-16 rounded-full mr-3"
        />
        <View className=''>
          <View className="flex-row items-center mb-1">
            <Text className="font-bold text-neutral-800 mr-2">
              {comment.author.name}
            </Text>
          </View>
          <Text className="text-neutral-500 text-xs">{timeAgo}</Text>
        </View>
          </View>        
        <View className="flex-row items-center mt-1 ml-1">
          <Heart 
            size={14} 
            color={isLiked ? "#FF7256" : "#9CA3AF"}
            fill={isLiked ? "#FF7256" : "transparent"}
          />
          <Text className="ml-1 text-xs text-neutral-500">
            {comment.likes.length > 0 ? comment.likes.length : ''}
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <View className="rounded-lg p-3">
          <Text className="text-neutral-700">{comment.content}</Text>
        </View>
      </View>
    </ThemeView>
  );
}