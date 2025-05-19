import { useRegisterStore } from "@/stores/register";
import { Text, View, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { languages, useLanguage } from "@/lib/language";
import { useAppTheme } from "@/lib/theme";

export default function Step1() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const { theme } = useAppTheme();

  const genderChoices =
    languages[language].register.steps.step1.question1.choices;

  const [items, setItems] = useState<DropdownItem[]>([
    { label: genderChoices[1], value: "1" },
    { label: genderChoices[2], value: "2" },
    { label: genderChoices[3], value: "3" },
  ]);

  // Update items when language changes
  useEffect(() => {
    setItems([
      { label: genderChoices[1], value: "1" },
      { label: genderChoices[2], value: "2" },
      { label: genderChoices[3], value: "3" },
    ]);
  }, [language, genderChoices]);

  const handleGender = (value: string | null) => {
    if (value) {
      const selected = items.find((item) => item.value === value);
      if (selected) setField("gender", selected.label);
    }
  };
  type DropdownItem = {
    label: string;
    value: string;
  };

  const handleDob = (e: DateTimePickerEvent, date?: Date | undefined) => {
    setShowDatePicker(false);
    if (e.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    if (date) {
      setDob(date);
      setField("birthday", date);
    }
  };

  const handleWeight = (text: string) => {
    setWeight(text);
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue)) {
      let convertedValue = numericValue;
      if (weightUnit === "lbs") {
        // Convert lbs to kg
        convertedValue = numericValue * 0.453592;
      }
      setWeight(text);
      setField("weight", convertedValue);
    }
  };
  const handleHeight = (text: string) => {
    setHeight(text);
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue)) {
      let convertedValue = numericValue;
      if (heightUnit === "ft") {
        // Convert ft to cm
        convertedValue = numericValue * 30.48;
      }
      setHeight(text);
      setField("height", convertedValue);
    }
  };

  return (
    <View className="flex-1 gap-4 items-center px-6 mt-24 bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-center text-black dark:text-white">
        {languages[language].register.steps.step1.title}
      </Text>
      <Text className="text-gray-300 text-xl w-[300px] font-semibold dark:text-gray-500 text-center mt-4">
        {languages[language].register.steps.step1.desc}
      </Text>

      {/* Gender Dropdown */}
      <View className="w-full z-10">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={handleGender}
          placeholder={languages[language].register.steps.step1.question1.title}
          style={{
            borderRadius: 12,
            borderColor: "#ccc",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
            borderRadius: 12,
          }}
          placeholderStyle={{ fontSize: 15, color: "gray" , fontWeight: "semibold" }}
          textStyle={{ fontSize: 15, color: "#000" }}
        />
      </View>

      {/* Date Picker */}
      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="w-full border border-gray-300 rounded-xl py-5 px-4 bg-white"
      >
        <Text className="text-gray-500 font-normal text-base">
          {dob ? dob.toDateString() : "Төрсөн өдрөө сонгоно уу"}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          themeVariant={theme}
          design="default"
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
          onChange={handleDob}
        />
      )}

      // Weight Input
      <View className="w-full flex-row items-center justify-between gap-4">
        <View className="flex-1 flex-row items-center border border-gray-300 rounded-2xl bg-white px-4 py-5 ">
          
          <TextInput
            placeholder={languages[language].register.steps.step1.weight}
            placeholderTextColor="#A9A9A9"
            value={weight}
            onChangeText={handleWeight}
            keyboardType="numeric"
            className="flex-1 text-base text-gray-800 font-medium"
          />
        </View>
        <Pressable
          onPress={() => setWeightUnit((prev) => (prev === "kg" ? "lbs" : "kg"))}
          className="w-16 h-[60px] bg-[#0066FF] rounded-2xl items-center justify-center shadow-md shadow-blue-600/50"
        >
          <Text className="text-white font-bold">{weightUnit.toUpperCase()}</Text>
        </Pressable>
      </View>

// Height Input
      <View className="w-full flex-row items-center justify-between gap-4 ">
        <View className="flex-1 flex-row items-center border border-gray-300 rounded-2xl bg-white px-4 py-5">
          
          <TextInput
            placeholder={languages[language].register.steps.step1.height}
            placeholderTextColor="#A9A9A9"
            value={height}
            onChangeText={handleHeight}
            keyboardType="numeric"
            className="flex-1 text-base text-gray-800 font-medium"
          />
        </View>
        <Pressable
          onPress={() => setHeightUnit((prev) => (prev === "cm" ? "ft" : "cm"))}
          className="w-16 h-[60px] bg-[#0066FF] rounded-2xl items-center justify-center shadow-md shadow-blue-600/50"
        >
          <Text className="text-white font-bold">{heightUnit.toUpperCase()}</Text>
        </Pressable>
      </View>


    </View>
  );
}
