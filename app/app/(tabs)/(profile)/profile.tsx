import { ThemeView, ThemeText } from "@/components";
import { useCallback, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, Pressable, View } from "react-native";
import Tab1 from "@/components/profile/tab1";
import Tab2 from "@/components/profile/tab2";
import Tab3 from "@/components/profile/tab3";

const Tabs = () => {
  const tabRef = useRef<FlatList>(null);
  const [width, setWidth] = useState<number>(0);
  const tabs = [
    {
      key: "1",
      component: Tab1,
    },
    {
      key: "2",
      component: Tab2,
    },
    {
      key: "3",
      component: Tab3,
    },
  ];

  const renderItem = useCallback(
    ({ item }: { item: { key: string; component: React.ComponentType } }) => (
      <View style={{ width: width }} key={item.key}>
        <item.component />
      </View>
    ),
    [width]
  );

  const scrollTo = (index: number) => {
    if (tabRef.current && index >= 0 && index < tabs.length) {
      requestAnimationFrame(() => {
        tabRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
          viewOffset: 0,
        });
      });
    }
  };

  const setDimensions = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  }, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const TabButton = ({ children, tab }: { children: string; tab: number }) => {
    return (
      <View className="flex-1 overflow-hidden h-12">
        <Pressable
          android_ripple={{
            color: "#00000020",
            radius: 40,
          }}
          onPress={() => scrollTo(tab)}
          className="flex-1 border justify-center items-center"
        >
          <ThemeText>{children}</ThemeText>
        </Pressable>
      </View>
    );
  };

  return (
    <View className="flex-1 m-12" onLayout={setDimensions}>
      <View className="flex-row justify-between w-full items-center bg-white dark:bg-gray-800">
        <TabButton tab={0}>Tab1</TabButton>
        <TabButton tab={1}>Tab2</TabButton>
        <TabButton tab={2}>Tab3</TabButton>
      </View>
      <FlatList
        ref={tabRef}
        initialScrollIndex={0}
        data={tabs}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews={false}
        maxToRenderPerBatch={3}
        windowSize={3}
        initialNumToRender={1}
      />
    </View>
  );
};

export default function Tab() {
  return (
    <ThemeView className="items-center justify-center">
      <Tabs />
    </ThemeView>
  );
}
