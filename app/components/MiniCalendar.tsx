import { View, Text, Pressable, Animated } from "react-native";
import { useState, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  getDate,
  addMonths,
  subMonths,
} from "date-fns";
import { Feather } from '@expo/vector-icons';

const weekdayShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const today = new Date();
  

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const totalDays = getDate(end);
  const startDay = (getDay(start) + 6) % 7;

  const daysArray = Array(startDay).fill(null).concat([...Array(totalDays)].map((_, i) => i + 1));
  const isNextDisabled =
  currentDate.getMonth() === today.getMonth() &&
  currentDate.getFullYear() === today.getFullYear();
 
  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    const today = new Date();
    if (nextMonth <= addMonths(today, 6)) {
      setCurrentDate(nextMonth);
    }
  };

  const isToday = (date: number) => {
    return (
      today.getDate() === date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const isCompleted = (date: number) => {
    return completedDays.includes(date);
  };

  const handleCompleteStreak = (day: number) => {
    setCompletedDays((prev) => {
      return prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
    });
  };

  const ArrowButton = ({ direction, onPress ,}: { direction: "left" | "right", onPress: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [buttonColor, setButtonColor] = useState('bg-blue-500');
    const handlePressIn = () => {
        setButtonColor('bg-blue-700'); 
      Animated.spring(scaleAnim, {
        toValue: 0.85,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
        setButtonColor('bg-blue-500');
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3, // slows down a bit
            tension: 40,
            useNativeDriver: true,
        }).start(() => {
            onPress(); // trigger onPress after bounce back
        });
    };
    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable 
          onPressIn={handlePressIn} 
          onPressOut={handlePressOut} 
          style={{ padding: 8 }} // Add padding to the button for better touch area
        >
          <View className={`rounded-full p-2 ${buttonColor}`}>
            <Feather
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={18}
              color="white"
            />
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View className="w-full mt-2 border-2 border-gray-200 p-3 rounded-xl">
      {/* Header with month and nav */}
      <View className="w-full mt-2  rounded-xl">
  {/* Header with month and nav */}
  <View className="flex-row justify-between items-center mb-4 px-2">
    <ArrowButton direction="left" onPress={handlePrevMonth} />
    
    <Text className="text-lg font-bold text-black dark:text-white text-center flex-grow">
      {format(currentDate, "MMMM, yyyy")}
    </Text>
    
    {isNextDisabled ? (
      <View className="bg-gray-400 rounded-full p-2">
        <Feather name="chevron-right" size={18} color="white" />
      </View>
    ) : (
      <ArrowButton direction="right" onPress={handleNextMonth} />
    )}
  </View>
</View>


      {/* Weekday titles */}
      <View className="flex-row justify-between mb-1">
        {weekdayShort.map((day, i) => (
          <Text key={i} className="flex-1 text-center text-sm font-bold text-gray-400 dark:text-gray-400">
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap mt-2">
        {daysArray.map((day, index) => {
          const isTodayDate = isToday(day);
          const isStreakDay = isCompleted(day);

          const baseStyle = "w-[14.28%] aspect-square items-center justify-center p-1";
          const dayCircleStyle = `
            w-12 h-12 items-center justify-center rounded-full
            ${isStreakDay ? "bg-blue-500" : ""}
            ${isTodayDate && !isStreakDay ? "border-2 border-blue-500" : ""}
          `;
          const dayTextStyle = `
            text-md font-bold
            ${isStreakDay ? "text-white" : "text-gray-600 dark:text-gray-400"}
          `;

          return (
            <View key={index} className={baseStyle}>
              {day ? (
                <Pressable onPress={() => handleCompleteStreak(day)} className={dayCircleStyle}>
                  <Text className={dayTextStyle}>{day}</Text>
                </Pressable>
              ) : (
                <Text className="text-transparent">0</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
