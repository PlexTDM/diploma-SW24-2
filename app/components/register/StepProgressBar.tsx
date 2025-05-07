import { useRegisterStore } from "@/lib/store";
import { useAppTheme } from "@/lib/theme";
import { useNavigation, useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Icon } from "react-native-paper";

export default function ProgressBar({ maxTabs = 3 }: { maxTabs?: number }) {
  const { theme } = useAppTheme();
  const { progress } = useRegisterStore();
  const router = useRouter();
  const navigaton = useNavigation();
  const maxStep = maxTabs;

  const handleBack = () => {
    if (navigaton.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)/home");
    }
  };

  return (
    <View className="flex-row w-full items-center px-4 h-[60px]">
      <Button
        className="top-0 left-0"
        mode="text"
        rippleColor={"#FFf00020"}
        onPress={handleBack}
      >
        <Icon
          source="chevron-left"
          size={24}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </Button>
      <View className="flex-1 h-2 flex-row overflow-hidden gap-2">
        {[...Array(maxStep).keys()].map((step) => {
          return (
            <View
              key={step}
              className={`flex-1 rounded-full ${
                step === progress
                  ? "bg-black dark:bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          );
        })}
      </View>
    </View>
  );
}
