import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Switch, FlatList, ScrollView } from "react-native";
import { ThemeText, ThemeView } from "@/components";
function custom_workout( {
    visible,
    setVisible,
  }: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const [containerHeight, setContainerHeight] = useState(400);
    return (
        <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      presentationStyle="pageSheet"
      animationType="slide"
    >
        <ScrollView>
            <ThemeView className="flex-1 items-center pt-12 px-8 bg-white"
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
                <View className="w-full h-60 overflow-hidden rounded-[40px] bg-white dark:bg-gray-900 justify-center items-start">
                  <Text className="">Hello</Text>
                </View>
            </ThemeView>
        </ScrollView>
        </Modal>
    )
}

export default custom_workout