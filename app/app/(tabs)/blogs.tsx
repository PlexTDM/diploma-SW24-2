import {
  TextInput,
  Pressable,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { use, useEffect, useState } from "react";
import { useBlogStore } from "@/stores/blogStore";
import PostCard from "@/components/PostCard";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemeView } from "@/components";
import { AuthContext } from "@/context/auth";

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { user } = use(AuthContext);
  const { posts, setUser, loadPosts, loadingPosts } = useBlogStore();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    loadPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  useEffect(() => {
    if (user) {
      setUser(user);
      loadPosts();
    }
  }, [user, setUser, loadPosts]);

  if (!user) {
    return (
      <ThemeView className="justify-center items-center">
        <Text>Please login to continue</Text>
      </ThemeView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ThemeView className="flex-1 bg-white p-6 pt-0">
        <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-white  ">
          Social
        </Text>
        <View
          className={`flex-row w-full justify-start items-center dark:border-gray-700 rounded-full p-2 mb-4 h-14 pl-3 gap-2 border-2 ${
            isFocused ? "border-blue-200" : "border-gray-200"
          }`}
        >
          <Search size={18} color="#B6B7BC" />
          <TextInput
            placeholder="Search posts"
            placeholderTextColor="#B6B7BC"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 text-gray-900"
          />
        </View>
        <Pressable
          onPress={() => router.push("/(blog)/create")}
          className="w-20 h-20 bg-blue-500 rounded-full justify-center items-center"
        >
          <Feather name="plus" size={20} color="white" />
        </Pressable>

        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          className="mt-6"
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loadingPosts}
              onRefresh={onRefresh}
              tintColor="#3B82F6"
              colors={["#3B82F6"]}
            />
          }
          ListEmptyComponent={
            <View
              className="flex-1 justify-center items-center"
              style={{ paddingTop: insets.top }}
            >
              <Text className="text-neutral-500 font-medium text-lg">
                No posts yet
              </Text>
              <Text className="text-neutral-400 text-center mt-2 px-10">
                Create a new post or wait for others to share their thoughts
              </Text>
            </View>
          }
        />
      </ThemeView>
    </SafeAreaView>
  );
}
