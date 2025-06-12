import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePickerModal from "@/components/ui/ImagePickerModal";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";
import { useBlogStore } from "@/stores/blogStore";
import { useTranslation } from "@/lib/language";

export default function Create() {
  const { theme } = useAppTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageVisible, setImageVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addPost } = useBlogStore();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    const res = await addPost({
      title,
      content,
      image: imageUrl,
    });

    if (res) {
      router.replace("/(tabs)/blogs");
    }
  };

  const isSubmitDisabled = !title.trim() || !content.trim();

  const handleCameraPress = async () => {
    setImageVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleGalleryPress = async () => {
    setImageVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <ThemeView style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between p-4 border-b border-neutral-100">
        <Pressable onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </Pressable>
        <Text className="text-lg font-bold text-neutral-800 dark:text-white">
          {t("post.create")}
        </Text>
        <Pressable
          className={`py-2 px-4 rounded-full ${
            isSubmitDisabled ? "bg-neutral-200" : "bg-primary-500"
          }`}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text
            className={`${
              isSubmitDisabled
                ? "text-neutral-500 dark:text-neutral-900"
                : "text-black dark:text-white"
            } font-medium`}
          >
            {t("post.button")}
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 p-4">
        <TextInput
          className="text-xl font-bold text-neutral-800 dark:text-slate-100 mb-4"
          placeholder="Title"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          multiline
        />

        <TextInput
          className="text-base text-neutral-700 dark:text-slate-100 min-h-40"
          placeholder="What's on your mind?"
          placeholderTextColor="#9CA3AF"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {imageUrl ? (
          <View className="mt-4 rounded-lg overflow-hidden relative">
            <Image
              source={{ uri: imageUrl }}
              className="w-full aspect-video rounded-lg"
              resizeMode="cover"
            />
            <Pressable
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
              onPress={() => setImageUrl("")}
            >
              <Feather name="x" size={20} color="white" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            className="mt-4 border-2 border-dashed border-neutral-300 rounded-lg p-6 items-center"
            onPress={() => {
              setImageVisible(true);
            }}
          >
            <Feather name="plus" size={32} color="#9CA3AF" />
            <Text className="mt-2 text-neutral-500">{t("post.image")}</Text>
          </Pressable>
        )}
      </ScrollView>
      <ImagePickerModal
        visible={imageVisible}
        onClose={() => setImageVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
      />
    </ThemeView>
  );
}
