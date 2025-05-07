import { useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";
import { Text, View, StyleSheet, _View } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { languages, useLanguage } from "@/lib/language";

export default function Step1() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const genderChoices =
    languages[language].register.steps.step2.question1.choices;

  const [items, setItems] = useState([
    { label: genderChoices[1], value: "1" },
    { label: genderChoices[2], value: "2" },
    { label: genderChoices[3], value: "3" },
  ]);

  useEffect(() => {
    // Update items dynamically when language changes
    setItems([
      { label: genderChoices[1], value: "1" },
      { label: genderChoices[2], value: "2" },
      { label: genderChoices[3], value: "3" },
    ]);
  }, [language]);

  return (
    <View className="flex-1 justify-center items-center w-full gap-4 pt-10">
      <Text className="text-2xl font-bold w-[80%] text-center">
        {languages[language].register.steps.step2.title}
      </Text>
      <Text className="text-gray-300 text-xl w-[300px] font-semibold dark:text-gray-500 text-center">
        {languages[language].register.steps.step2.desc}
      </Text>
      <View className="flex-1 w-[80%] mt-4">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={languages[language].register.steps.step2.question1.title}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={{ fontSize: 16, color: "#aaa" }}
          textStyle={{ fontSize: 16, color: "#000" }}
          zIndex={1000}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "#aaa",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  dropdownContainer: {
    borderColor: "#aaa",
    borderRadius: 20,
  },
});
