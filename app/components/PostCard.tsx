import { View, Image, Pressable } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";
import { Heart, MessageCircle, Bookmark } from "lucide-react-native";
import { useBlogStore, Post } from "@/stores/blogStore";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import Text from "@/components/ui/FonttoiText";
import ThemeView from "./ui/ThemeView";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { currentUser, toggleLike, toggleBookmark } = useBlogStore();

  const isLiked = post.likes.includes(currentUser.id);
  const isBookmarked = post.isBookmarked;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = () => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    toggleLike(post.id);
  };

  const handleBookmark = () => toggleBookmark(post.id);
  const navigateToDetail = () => router.push(`/post/${post.id}`);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <ThemeView className="flex-1">
      <Pressable
        onPress={navigateToDetail}
        className="border border-gray-300 dark:border-gray-700 p-6 rounded-3xl mb-5 bg-white dark:bg-gray-800/40"
        accessibilityLabel={`Open post titled ${post.title}`}
      >
        {/* Author */}
        <View className="flex-row items-center mb-3">
          <Image
            source={{ uri: post.author?.avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View>
            <Text className="font-bold text-neutral-800 dark:text-gray-100">
              {post.author?.name}
            </Text>
            <Text className="text-xs text-neutral-500 dark:text-gray-400">
              {timeAgo}
            </Text>
          </View>
        </View>

        {/* Title and Content */}
        <Text className="text-lg font-bold text-neutral-800 dark:text-gray-100 mb-2">
          {post.title}
        </Text>
        <Text
          className="text-neutral-700 dark:text-gray-300 mb-3"
          numberOfLines={3}
        >
          {post.content}
        </Text>

        {/* Post Image */}
        {post.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            className="w-full aspect-video rounded-lg mb-3"
            resizeMode="cover"
          />
        )}

        {/* Actions */}
        <View className="flex-row gap-10 items-center  mt-3">
          <Pressable
            className="flex-row items-center"
            onPress={handleLike}
            accessibilityLabel="Like post"
          >
            <Animated.View style={animatedStyle}>
              <Heart
                size={20}
                color={isLiked ? "#E9509F" : "#6B7280"}
                fill={isLiked ? "#E9509F" : "transparent"}
              />
            </Animated.View>
            <Text className="ml-1 text-neutral-600 dark:text-gray-300">
              {post.likes.length}
            </Text>
          </Pressable>

          <Pressable
            className="flex-row items-center"
            onPress={navigateToDetail}
            accessibilityLabel="View comments"
          >
            <MessageCircle size={20} color="#20FFB8" />
            <Text className="ml-1 text-neutral-600 dark:text-gray-300">
              {post.comments.length}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleBookmark}
            accessibilityLabel="Bookmark post"
          >
            <Bookmark
              size={20}
              color={isBookmarked ? "#3B82F6" : "#6B7280"}
              fill={isBookmarked ? "#3B82F6" : "transparent"}
            />
          </Pressable>
        </View>
      </Pressable>
    </ThemeView>
  );
}
