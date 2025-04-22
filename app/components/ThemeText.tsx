import { useAppTheme } from "@/lib/theme";
import { Text } from "react-native";

const ThemeText = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const defaultClassName = "dark:text-white text-black";
  const classname = className
    ? `${className} ${defaultClassName}`
    : defaultClassName;
  const { theme } = useAppTheme();
  return (
    <Text
      {...props}
      className={`${
        theme === "dark" ? "text-white" : "text-black"
      } ${classname}`}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
