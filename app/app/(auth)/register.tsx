import { useRegisterStore } from "@/lib/store";
import {
  LayoutChangeEvent,
  View,
  Platform,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { languages, useLanguage } from "@/lib/language";
import {
  StepProgressBar,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
} from "@/components/register";
import { useRouter } from "expo-router";
import { ThemeView } from "@/components";

export default function Register() {
  const store = useRegisterStore();
  const { setField } = store;
  const { language } = useLanguage();
  const [tab, setTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();

  const scrollRef = useRef<FlatList>(null);

  // Pre-define the data array to avoid recreating it on each render
  const steps = [
    { key: "1", component: Step1 },
    { key: "2", component: Step2 },
    { key: "3", component: Step3 },
    { key: "4", component: Step4 },
    { key: "5", component: Step5 },
    { key: "6", component: Step6 },
    { key: "7", component: Step7 },
  ];

  const maxTabs = steps.length;

  const scrollToTab = (index: number) => {
    if (screenWidth > 0 && scrollRef.current && index >= 0 && index < maxTabs) {
      setField("progress", index);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
          viewOffset: 0,
        });
      });
    }
  };

  const handleNext = () => {
    if (tab === maxTabs - 1) {
      router.push("/(auth)/signup");
      return;
    }
    if (tab < maxTabs) {
      const nextTab = tab + 1;
      scrollToTab(nextTab);
      setTab(nextTab);
    }
  };

  const handleBack = () => {
    if (tab > 0) {
      const prevTab = tab - 1;
      scrollToTab(prevTab);
      setTab(prevTab);
    }
  };

  const setDimensions = useCallback((e: LayoutChangeEvent) => {
    setScreenWidth(e.nativeEvent.layout.width);
  }, []);

  // Memoize the getItemLayout function
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth]
  );

  // Memoize the render item function
  const renderItem = useCallback(
    ({ item }: { item: { key: string; component: React.ComponentType } }) => (
      <View style={{ width: screenWidth }}>
        <item.component />
      </View>
    ),
    [screenWidth]
  );

  const nextDisabeled = () => {
    if (process.env.NODE_ENV === "development") return false;
    switch (tab) {
      case 0:
        return !Boolean(
          store.height && store.gender && store.weight && store.birthday
        );
      case 1:
        return !Boolean(store.goal);
      case 2:
        return !Boolean(store.activityLevel);
      case 3:
        return !Boolean(store.mealPerDay);
      case 4:
        return !Boolean(store.waterPerDay);
      case 5:
        return !Boolean(store.workSchedule);
      case 6:
        return !Boolean(store.healthCondition);
      default:
        return false;
    }
  };

  return (
    <ThemeView className="flex-1" onLayout={setDimensions}>
      <StepProgressBar maxTabs={maxTabs} />

      <View className="flex-1 items-center justify-center overflow-hidden">
        {/* code for web idk why i made this tbh */}
        {Platform.OS === "web" ? (
          <View className="flex-1 overflow-hidden">
            {tab === 0 && <Step1 />}
            {tab === 1 && <Step2 />}
            {tab === 2 && <Step3 />}
            {tab === 3 && <Step4 />}
            {tab === 4 && <Step5 />}
            {tab === 5 && <Step6 />}
            {tab === 6 && <Step7 />}
          </View>
        ) : (
          <View className="flex-1 overflow-hidden">
            <FlatList
              ref={scrollRef}
              initialScrollIndex={0}
              data={steps}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
              nestedScrollEnabled={true}
              renderItem={renderItem}
              getItemLayout={getItemLayout}
              removeClippedSubviews={false}
              maxToRenderPerBatch={1}
              windowSize={5}
              initialNumToRender={1}
            />
          </View>
        )}

        <View className="flex-row w-full px-12 justify-between mt-4 mb-12">
          <Pressable
            className={`px-6 py-3 items-center justify-center rounded-3xl font-medium ${
              tab === 0 ? "text-gray-800 bg-gray-300" : "bg-white text-black"
            }`}
            android_ripple={{
              color: "#6b7280",
              radius: 30,
            }}
            onPress={handleBack}
            disabled={tab === 0}
          >
            <Text
              className={`text-center ${
                tab === 0 ? "text-gray-400" : "text-black"
              }`}
            >
              {languages[language].back}
            </Text>
          </Pressable>
          <Pressable
            className={`px-6 py-3 items-center justify-center rounded-3xl font-medium ${
              nextDisabeled() ? "bg-gray-300" : "bg-blue-500"
            }`}
            android_ripple={{
              color: "#6b7280",
              radius: 30,
            }}
            onPress={handleNext}
            disabled={nextDisabeled()}
          >
            <Text
              className={`text-center ${
                nextDisabeled() ? "text-gray-400" : "text-white"
              }`}
            >
              {languages[language].next}
            </Text>
          </Pressable>
        </View>
      </View>
    </ThemeView>
  );
}
