import { useRegisterStore } from "@/lib/store";
import { Text, View, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { languages, useLanguage } from "@/lib/language";

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

  const genderChoices =
    languages[language].register.steps.step1.question1.choices;

  const [items, setItems] = useState([
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

  const handleChange = ({ label }: ItemType<string>) => {
    if (label) {
      setField("gender", label);
    }
  };

  return (
    <View className="flex-1 gap-4 items-center px-6 pt-10 bg-white dark:bg-black">
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
          onSelectItem={handleChange}
          placeholder={languages[language].register.steps.step1.question1.title}
          style={{
            borderRadius: 12,
            borderColor: "#ccc",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
            borderRadius: 12,
          }}
          placeholderStyle={{ fontSize: 16, color: "gray" }}
          textStyle={{ fontSize: 16, color: "#000" }}
        />
      </View>

      {/* Date Picker */}
      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="w-full border border-gray-300 rounded-xl p-4 bg-white"
      >
        <Text className="text-gray-800">
          {dob ? dob.toDateString() : "Төрсөн өдрөө сонгоно уу"}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      {/* Weight Input */}
      <View className="w-full flex-row items-center border bg-white border-gray-300 rounded-xl overflow-hidden">
        <TextInput
          placeholder={languages[language].register.steps.step1.weight}
          placeholderTextColor="gray"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          className="flex-1 p-4 text-gray-800"
        />
        <Pressable
          onPress={() =>
            setWeightUnit((prev) => (prev === "kg" ? "lbs" : "kg"))
          }
          className="px-4 py-3"
        >
          <Text className="text-black font-bold">
            {weightUnit.toUpperCase()}
          </Text>
        </Pressable>
      </View>

      {/* Height Input */}
      <View className="w-full flex-row items-center border bg-white border-gray-300 rounded-xl overflow-hidden">
        <TextInput
          placeholder={languages[language].register.steps.step1.height}
          placeholderTextColor="gray"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          className="flex-1 p-4 text-gray-800"
        />
        <Pressable
          onPress={() => setHeightUnit((prev) => (prev === "cm" ? "ft" : "cm"))}
          className="px-4 py-3"
        >
          <Text className="text-black font-bold">
            {heightUnit.toUpperCase()}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
