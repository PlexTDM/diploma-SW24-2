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
import { useState } from "react";
import { useBlogStore } from "@/stores/blogStore";
import PostCard from "@/components/PostCard";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemeView } from "@/components";
import { useTranslation } from "@/lib/language";

export default function FeedScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { posts } = useBlogStore();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  if (!posts || posts.length === 0) {
    return (
      <View
        className="flex-1 bg-white justify-center items-center"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-neutral-500 font-medium text-lg">
          {t("post.notpost")}
        </Text>
        <Text className="text-neutral-400 text-center mt-2 px-10">
          {t("post.create")}
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <ThemeView className="flex-1 bg-white p-6 pt-0">
        <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-white  ">
          {t("post.title")}
        </Text>
        <View
          className={`flex-row w-full justify-start items-center dark:border-gray-700 rounded-full p-2 mb-4 h-14 pl-3 gap-2 border-2 ${
            isFocused ? "border-blue-200" : "border-gray-200"
          }`}
        >
          <Search size={18} color="#B6B7BC" />
          <TextInput
            placeholder={t("post.search")}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          className="mt-6"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3B82F6"
              colors={["#3B82F6"]}
            />
          }
        />
      </ThemeView>
    </SafeAreaView>
  );
}
