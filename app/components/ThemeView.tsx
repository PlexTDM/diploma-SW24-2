import { useAppTheme } from "@/lib/theme";
import { View } from "react-native";

const ThemeView = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme } = useAppTheme();
  return (
    <View
      {...props}
      className={`dark:bg-gray-900 bg-white flex-1 ${className}`}
    >
      {children}
    </View>
  );
};

export default ThemeView;
