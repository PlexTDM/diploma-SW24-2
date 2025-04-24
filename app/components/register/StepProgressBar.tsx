import { View } from "react-native";
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";
import { useAppTheme } from "@/lib/theme";

export default function ProgressBar() {
  const { theme } = useAppTheme();
  const { progress } = useRegisterStore();
  const router = useRouter();
  const navigaton = useNavigation();
  const maxStep = 3;

  const handleBack = () => {
    if (navigaton.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)");
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
        <ArrowLeft size={40} color={theme === "dark" ? "white" : "black"} />
      </Button>
      <View className="flex-1 h-2 flex-row overflow-hidden gap-2">
        {[...Array(maxStep).keys()].map((step) => {
          return (
            <View
              key={step}
              className={`flex-1 rounded-full ${
                step === progress ? "bg-blue1" : "bg-gray-200"
              }`}
            />
          );
        })}
      </View>
    </View>
  );
}
