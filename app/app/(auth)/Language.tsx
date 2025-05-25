import { useRouter } from "expo-router";
import { useAppTheme } from "@/lib/theme";
import { View, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { ThemeText, ThemeView } from "@/components";
import { languages, useLanguage } from "@/lib/language";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "expo-image";

export default function Language() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(language);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Монгол", value: "mn" },
  ]);

  return (
    <ThemeView className="flex-1 items-center px-4 gap-10 pt-12">
      <View className="items-center gap-10">
        <Image
          source={require("@/assets/mascot/BluviSmile.png")}
          style={{ width: 200, height: 200 }} // ✅ Тохиромжтой хэмжээгээр
          cachePolicy={"memory-disk"}
          contentFit={"contain"}
          focusable={false}
        />

        <ThemeText className="text-xl text-center">
          {languages[language].language.asuult}
        </ThemeText>

        <View className="w-[80%]">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const selectedValue = callback(value);
              setValue(selectedValue);
              setLanguage(selectedValue);
            }}
            setItems={setItems}
            placeholder="Please select your language"
          />
        </View>
      </View>
      <View className="justify-end">
        <TouchableHighlight
          onPress={() => {
            router.push("/(auth)/welcome");
          }}
          className="bg-blue1/70 border-2 border-blue1 dark:bg-white rounded-full px-10 py-2 items-center"
          activeOpacity={0.9}
          underlayColor={"#DDDDDD"}
        >
          <ThemeText className="text-lg text-black font-semibold text-center">
            {languages[language].a}
          </ThemeText>
        </TouchableHighlight>
      </View>
    </ThemeView>
  );
}
