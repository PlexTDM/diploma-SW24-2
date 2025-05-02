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
  return (
    <Text {...props} className={`${classname}`}>
      {children}
    </Text>
  );
};

export default ThemeText;
