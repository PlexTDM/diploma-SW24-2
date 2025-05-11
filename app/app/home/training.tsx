import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme, Pressable } from 'react-native';
import moment, { Moment } from 'moment';
import { useRouter } from 'expo-router';
import { Feather} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';
import { ThemeView } from '@/components';
import { ThemeText } from '@/components';
import { languages, useLanguage } from "@/lib/language";
import { ArrowRight, BarChart, ChevronRight, Dumbbell, DumbbellIcon, Flag } from 'lucide-react-native';

export default function Blog() {
  const [dates, setDates] = useState<Moment[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const router = useRouter();
  const { language } = useLanguage();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const today = moment();
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(today.clone().add(i, 'days'));
    }
    setDates(days);
  }, []);

  const handleSelectDate = (date: Moment) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  return (
    <ThemeView className='p-8'>
      {/* Calendar */}
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
              <Text style={[styles.dayText, isDark && { color: '#ccc' }]}>
                {date.format('dd').charAt(0)}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedDate,
                  isDark && !isSelected && { color: '#fff' },
                ]}
              >
              {date.format('D')}
            </Text>
          </TouchableOpacity>
        );
      })}
      </View>
      <ThemeText className="text-3xl text-start font-semibold mt-4">
      {languages[language].training.hi}, Galbadrakh!
      </ThemeText>   
      <ThemeText className="text-lg text-start mt-2 text-gray-500">
      {languages[language].training.hello}
      </ThemeText>
      <View className='w-full bg-gray-200 rounded-3xl mt-4 p-8'>
        <View className='flex-row items-start gap-4'>
         <View className='p-2 bg-blue-600 rounded-full items-center'>
          <Text className='text-white text-sm font-medium'>{languages[language].training.special}</Text>
         </View>
         <View className='p-2 px-4 bg-blue-600 rounded-full items-center'>
          <Text className='text-white text-sm font-medium'>Gym</Text>         
         </View>
        </View>
        <ThemeText className='text-black font-bold text-4xl mt-8'>75 min</ThemeText>
        <ThemeText className='text-slate-600 text-base'>Dasgaliin ner</ThemeText>
        <View className='flex-row mt-6 gap-2'>
          <View className='w-16 h-16 rounded-2xl bg-white'></View>
          <View className='w-16 h-16 rounded-2xl bg-white'></View>
          <View className='w-16 h-16 rounded-2xl bg-white'></View>
          <View className='w-16 h-16 rounded-2xl bg-white'></View>
          <View className='w-16 h-16 rounded-2xl bg-white justify-center items-center'>
           <ArrowRight size={20} color="black" />
          </View>
        </View>
      </View>
      <Pressable className='flex-row border rounded-3xl border-gray-400 w-full mt-5 p-4 items-center justify-between gap-4'>
        <View className='flex-row gap-4 items-center'>
        <View className='w-16 h-16 bg-gray-200 rounded-3xl justify-center items-center'>
         <Feather name='sliders' size={20} color='black' />
        </View>
        <ThemeText className='font-semibold text-lg'>{languages[language].training.custom}</ThemeText>
        </View>
        <ChevronRight size={20} color="black" />
      </Pressable>
      <View className='w-full bg-gray-200 rounded-3xl mt-4 p-8'>
        <View className='flex-row justify-between items-center'>
          <View className='flex-row gap-2'>
            <Dumbbell size={30} color="black" />
            <View className=''>
              <ThemeText className='text-sm font-bold '>{languages[language].training.get}</ThemeText>
              <ThemeText className='text-sm'>Complete 2 gym workouts</ThemeText>
            </View>
          </View>
          <ChevronRight size={20} color="black" />
        </View>
        <View className='mt-6 flex-row items-center justify-between'>
          <View className='w-10 h-10 rounded-full bg-gray-300 justify-center items-center'>
            <DumbbellIcon size={15} color="black"  />
          </View>
          <View className='w-10 h-10 rounded-full bg-gray-300 justify-center items-center'>
            <DumbbellIcon size={15} color="black"  />
          </View>
          <View className='w-10 h-10 rounded-full bg-gray-300 justify-center items-center'>
            <Flag size={15} color="black"  />
          </View>
          
        </View>
        <ThemeText className='mt-3'>Preliminary Strength Score: 350-650</ThemeText>
      </View>
     </ThemeView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  dayContainer: {
    alignItems: 'center',
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
