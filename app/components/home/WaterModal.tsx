import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Switch, FlatList, ScrollView } from "react-native";
import { ThemeView } from "@/components";
import WaterAnimation from "@/components/home/WaterAnimation";
import { Ionicons } from "@expo/vector-icons";

function WaterModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const waterGoal = 3500;
  const [currentWater, setCurrentWater] = useState(2100);
  const [containerHeight, setContainerHeight] = useState(400);

  const percentage = Math.min(Math.round((currentWater / waterGoal) * 100), 100);

  const addWater = (amount: number) => {
    setCurrentWater((prev) => Math.min(prev + amount, waterGoal));
  };

  const waterOptions = [100, 250, 500, 1000];

  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:00 AM", enabled: true },
    { id: 2, time: "09:00 AM", enabled: true },
    { id: 3, time: "12:00 PM", enabled: false },
    { id: 4, time: "03:00 PM", enabled: true },
    { id: 5, time: "06:00 PM", enabled: false },
  ]);

  const toggleAlarm = (id: number) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <ScrollView>
      <ThemeView
        className="flex-1 items-center pt-12 px-8 bg-white"
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        {/* Water progress */}
        <View className="w-full h-60 overflow-hidden rounded-[40px] bg-white dark:bg-gray-900 justify-center items-start">
          <View className="flex-row items-center mt-6 gap-2">
            <Text className="text-[60px] ml-6">{percentage}</Text>
            <Text className="text-[20px] font-bold mt-8">%</Text>
          </View>
          <Text className="text-center text-sm mb-2 ml-10">
            {currentWater} ml of {waterGoal} ml
          </Text>
          <WaterAnimation
            currentWater={currentWater}
            waterGoal={waterGoal}
            containerHeight={240}
          />
        </View>

        {/* Add Water Section */}
        <View className="w-full flex-row flex-wrap justify-between mt-6">
          <Text className="text-xl text-black font-semibold ml-3">Add</Text>
          <View className="w-full flex-row flex-wrap justify-between gap-4 px-2 mt-6">
            {waterOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => addWater(amount)}
                className="flex-row items-center bg-blue-200/50 rounded-xl px-4 py-2 mb-3 h-16"
                style={{ width: "45%" }}
              >
                <Ionicons name="water" size={20} color="#2563EB" />
                <Text className="text-blue-800 font-semibold ml-2">{amount} ml</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Alarm Section */}
        <View className="mt-6 w-full px-2">
          <Text className="text-xl text-black font-semibold ml-1 mb-3">Alarm</Text>

          {alarms.map((alarm) => (
            <View
              key={alarm.id}
              className="flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-xl mb-2"
            >
              <View className="flex-row items-center space-x-2">
                <Ionicons name="alarm-outline" size={20} color="#2563EB" />
                <Text className="text-gray-800 text-base">{alarm.time}</Text>
              </View>
              <Switch
                value={alarm.enabled}
                onValueChange={() => toggleAlarm(alarm.id)}
                thumbColor={alarm.enabled ? "#2563EB" : "#ccc"}
                trackColor={{ false: "#ccc", true: "#93c5fd" }}
              />
            </View>
          ))}
        </View>
      </ThemeView>
      </ScrollView>
    </Modal>
  );
}

export default WaterModal;
