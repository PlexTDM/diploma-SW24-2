import { View, ScrollView } from "react-native";
import { ThemeView, ThemeText } from "@/components";
import MiniCalendar from "@/components/MiniCalendar";

export default function Streak() {
  return (
    <ThemeView className="flex-1 px-4 py-6 bg-white dark:bg-black">
      <ScrollView>
        <MiniCalendar />
      </ScrollView>
    </ThemeView>
  );
}
