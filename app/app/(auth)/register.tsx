import { useRegisterStore } from "@/lib/store";
import { Button } from "react-native-paper";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  Platform,
  FlatList,
} from "react-native";
import ProgressBar from "@/components/register/progressBar";
import { useCallback, useRef, useState } from "react";
import Dialogue from "@/components/register/dialogue";
import { languages, useLanguage } from "@/lib/language";
import Step1 from "@/components/register/step1";
import Step2 from "@/components/register/step2";
import Step3 from "@/components/register/step3";
import Step4 from "@/components/register/step4";
import Step5 from "@/components/register/step5";
import Step6 from "@/components/register/step6";
import Step7 from "@/components/register/step7";
import { ThemeText, ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";
import StepProgressBar from "@/components/register/StepProgressBar";

export default function Register() {
  const { theme } = useAppTheme();
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [tab, setTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const scrollRef = useRef<FlatList>(null);

  const maxTabs = 8; // 0,1,2

  const scrollToTab = (index: number) => {
    if (screenWidth > 0 && scrollRef.current) {
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

  return (
    <ThemeView className="flex-1" onLayout={setDimensions}>
      {/* <ProgressBar /> */}
      <StepProgressBar />
      {/* <Dialogue text={languages[language].register.age} /> */}

      <View className="flex-1 items-center justify-center overflow-hidden">
        {/* Web scroll wrapper */}
        {Platform.OS === "web" ? (
          <View className="flex-1 overflow-hidden">
            {tab === 0 && <Step1 />}
            {tab === 1 && <Step2 />}
            {tab === 2 && <Step3 />}
            {tab === 3 && <Step4 />}
            {tab === 4 && <Step5 />}
            {tab === 5 && <Step6 />}
            {tab === 6 && <Step7 />}
            {/* Add more steps as needed */}
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
              removeClippedSubviews={true}
              maxToRenderPerBatch={1}
              windowSize={3}
              initialNumToRender={1}
            />
          </View>
        )}
        
        <View className="flex-row w-full px-12 justify-between mt-4 mb-12">
          <Button	
            mode="contained"
            onPress={handleBack}
            style={style.button1}
            textColor="black"
            className="text-black"
          >
            <ThemeText className="text-black ">{languages[language].back}</ThemeText>
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            style={style.button2}
            textColor="white"
          >
            <ThemeText className="text-white">{languages[language].next}</ThemeText>
          </Button>
        </View>
      </View>
    </ThemeView>
  );
}

const style = StyleSheet.create({
  button1: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  button2: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: 20,
  },
});
