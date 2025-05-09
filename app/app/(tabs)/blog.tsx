import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image';

const screenWidth = Dimensions.get('window').width;

const SevenDayCalendar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    const today = moment();
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(today.clone().add(i, 'days'));
    }

    setDates(days);
  }, []);

  const handleSelectDate = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  return (
    <View className='p-8 items-center'>
      <View className='flex-row justify-between items-center gap-80'>
        <Text className='font-bold text-2xl'>Calories</Text>
        <Feather name="bell" size={20} color="black" />
      </View>
      <View style={styles.container}>
      {dates.map((date) => {
        const isSelected = selectedDate === date.format('YYYY-MM-DD');
        return (
          <TouchableOpacity
            key={date.format('YYYY-MM-DD')}
            onPress={() => handleSelectDate(date)}
            style={styles.dayContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.dayText}>{date.format('dd').charAt(0)}</Text>
            <Text style={[styles.dateText, isSelected && styles.selectedDate]}>
              {date.format('D')}
            </Text>
          </TouchableOpacity>
        );
      })}
      </View>
      <View className='flex-row justify-between gap-7 mt-6'>
        <View className='flex-col gap-4 justify-center'>
        <View className='w-14 h-48 border rounded-full border-gray-400 pt-12'>
          <View className='w-15 h-36 bg-blue-300 rounded-full items-center'>
            <View className='top-2 flex bg-white w-10 h-10 rounded-full text-[10px] items-center justify-center'><Text className='text-[10px]'>1240</Text></View>
          </View>
        </View>
        <Text className='justify-center text-center text-gray-500'>Cal</Text>
        </View>
        <View className='flex-col gap-4 justify-center'>
        <View className='w-14 h-48 border rounded-full border-gray-400 pt-20'>
          <View className='w-15 h-28 bg-green-200 rounded-full items-center'>
            <View className='top-2 flex bg-white w-10 h-10 rounded-full text-[10px] items-center justify-center'><Text className='text-[10px]'>60.2</Text></View>
          </View>
        </View>
        <Text className='justify-center text-center text-gray-500'>Prot</Text>
        </View>
        <View className='flex-col gap-4 justify-center'>
        <View className='w-14 h-48 border rounded-full border-gray-400 pt-8'>
          <View className='w-15 h-40 bg-green-300 rounded-full items-center'>
            <View className='top-2 flex bg-white w-10 h-10 rounded-full text-[10px] items-center justify-center'><Text className='text-[10px]'>80.2</Text></View>
          </View>
        </View>
        <Text className='justify-center text-center text-gray-500'>Carb</Text>
        </View>
        <View className='flex-col gap-4 justify-center'>
        <View className='w-14 h-48 border rounded-full border-gray-400 pt-12'>
          <View className='w-15 h-36 bg-green-300 rounded-full items-center'>
            <View className='top-2 flex bg-white w-10 h-10 rounded-full text-[10px] items-center justify-center'><Text className='text-[10px]'>68.2</Text></View>
          </View>
        </View>
        <Text className='justify-center text-center text-gray-500'>Fats</Text>
        </View>
        <View className='flex-col gap-4 justify-center'>
        <View className='w-14 h-48 border rounded-full border-gray-400 pt-24'>
          <View className='w-15 h-24 bg-orange-200 rounded-full items-center'>
            <View className='top-2 flex bg-white w-10 h-10 rounded-full text-[10px] items-center justify-center'><Text className='text-[10px]'>12%</Text></View>
          </View>
        </View>
        <Text className='justify-center text-center text-gray-500'>RDC</Text>
        </View>
      </View>
      <View className='w-full h-[200px] bg-[#FB793C] rounded-3xl mt-6 p-7'>
        <Text className='text-2xl font-bold text-center text-white w-40'>Not sure what to eat? Let AI decide for you</Text>
        <View className='w-44 h-12 bg-gray-300 blur-xl rounded-full items-center justify-center mt-6 border border-white'>
          <Text className=''>Take Quiz</Text>
        </View>
      </View>
      <Text className='text-2xl font-bold mt-6'>Meals</Text>
      <View className='w-full h-24 border border-gray-300 rounded-3xl mt-6 flew-row p-2 flex-row'>
        <View className='w-20 h-20 border border-gray-300 rounded-full justify-center'>
          <Text className='text-center'>Hool zurag</Text>
        </View>
        <View className='ml-10 justify-center'>
          <Text className='font-bold text-center text-xl'>Breakfast</Text>
          <Text className='text-gray-500'>120/304 cal</Text>
        </View>
        <Pressable onPress={() => router.push("/(meal)")} className='w-14 h-14 rounded-full bg-[#CBE4FC] justify-center items-center mt-3 ml-28'>
        <Feather name="plus" size={32} color="#136CF1" />
        </Pressable>
      </View>
    </View>
  );
};

export default SevenDayCalendar;
 const router = useRouter();
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  dayContainer: {
    alignItems: 'center',
    width: (screenWidth - 20) / 7,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedDate: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 'bold',
  },
});
