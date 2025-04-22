import { useFocusEffect, useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";
import { Button } from "react-native-paper";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProgressBar from "@/components/register/progressBar";
import { useCallback, useRef, useState } from "react";
import Dialogue from "@/components/register/dialogue";
import { languages, useLanguage } from "@/lib/language";
import Step1 from "@/components/register/step1";
import Step2 from "@/components/register/step2";

export default function Register() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [tab, setTab] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const maxTabs = 2;

  // const router = useRouter();

  const handleNext = () => {
    if (tab >= maxTabs) {
      return;
    }
    scrollRef.current?.scrollTo({
      x: screenWidth * (tab + 1),
      animated: true,
    });
    setTab(tab + 1);
    setField("progress", tab + 1);
  };

  useFocusEffect(
    useCallback(() => {
      setField("progress", tab);
      scrollRef?.current?.scrollTo({ x: 0 });
    }, [])
  );

  const handleBack = () => {
    scrollRef.current?.scrollTo({
      x: screenWidth * (tab - 1),
      animated: true,
    });
    setField("progress", tab - 1);
    setTab(tab - 1);
  };

  const setDimensions = (e: LayoutChangeEvent) => {
    setScreenWidth(e.nativeEvent.layout.width);
  };

  return (
    <View className="bg-blue1 flex-1" onLayout={setDimensions}>
      <ProgressBar />
      <Dialogue text={languages[language].register.age} />
      <View className="flex-1 items-center justify-center overflow-hidden">
        {/* Step transition */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ width: screenWidth * 2 }}
          style={{ flex: 1 }}
        >
          <Step1 />
          <Step2 />
          <Step2 />
        </ScrollView>
        <View className="flex-row w-full px-6 justify-between">
          <Button
            mode="contained"
            onPress={handleBack}
            style={style.button}
            disabled={tab <= 0}
          >
            <Text>{languages[language].back}</Text>
          </Button>
          <Button
            mode="contained"
            style={style.button}
            onPress={handleNext}
            disabled={tab >= maxTabs}
          >
            {languages[language].next}
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 10,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
