import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { icons } from "@/constants/icons";
import { useAppTheme } from "@/lib/theme";

enum labelValues {
  home = "home",
  profile = "profile",
  settings = "settings",
}

type TabButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: labelValues;
  color: string;
  btnWidth: number;
};

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
}: TabButtonProps) => {
  const scale = useSharedValue(0);
  const { theme } = useAppTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 1]);
    return {
      opacity,
    };
  });

  const inimatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
    return {
      transform: [{ scale: scaleValue }],
    };
  });

  const buttonStyle = {
    width: isFocused ? 80 : 60,
    marginHorizontal: isFocused ? 10 : 5,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      // accessibilityLabel={options.tabBarAccessibilityLabel}
      // testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center relative z-10 flex-row"
      style={buttonStyle} // Apply dynamic button style
    >
      <Animated.View style={inimatedIconStyle}>
        {icons[label]({ color: isFocused ? "#fff" : "gray" })}
      </Animated.View>
      <Animated.Text
        style={[
          animatedTextStyle,
          {
            textTransform: "capitalize",
            color: isFocused
              ? isDark
                ? "#fff"
                : "#fff"
              : isDark
              ? "#fff"
              : "#000",
            display: isFocused ? "flex" : "none",
            width: isFocused ? "auto" : "0%",
          },
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });
  const btnWidth = dimensions.width / (state.routes.length - 1) - 5;
  const { theme } = useAppTheme();
  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions(e.nativeEvent.layout);
  };

  const tabPosition = useSharedValue(10);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPosition.value,
        },
      ],
    };
  });
  return (
    <View
      className="flex-row absolute bottom-[50px] left-0 right-0 items-center justify-between mx-12 py-4 px-3 bg-white dark:bg-slate-950 rounded-full shadow-lg"
      key={state.key}
      onLayout={onTabBarLayout}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            width: btnWidth + 15,
            marginLeft: -5,
            opacity: 1,
            height: dimensions.height - 12,
            backgroundColor: theme === "dark" ? "#4C91F9" : "#4C91F9",
            borderRadius: 999,
            zIndex: 1,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        if (route.name === "index") {
          return null;
        }
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          tabPosition.value = withSpring(
            Math.max(
              Math.min(
                (index - 1) * btnWidth + 5,
                dimensions.width - btnWidth - 5
              ),
              10
            ),
            {
              duration: 900,
              dampingRatio: 0.6,
              overshootClamping: false,
            }
          );
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            btnWidth={btnWidth}
            color={options.tabBarActiveTintColor || ""}
            label={
              (label?.toString().toLowerCase() as labelValues) ||
              (route.name.toLowerCase() as labelValues)
            }
          />
        );
      })}
    </View>
  );
}
