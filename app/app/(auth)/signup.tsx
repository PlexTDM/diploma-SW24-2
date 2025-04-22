import { ThemeText, ThemeView } from "@/components";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

const SignUp = () => {
  const handlePress = () => {};
  return (
    <ThemeView className="flex-1 items-center justify-start p-6">
      <ThemeText className="text-lg text-center mb-6">
        This is Register
      </ThemeText>
      <View className="w-3/4 mb-4 flex flex-col gap-4">
        <Button mode="contained" onPress={handlePress} rippleColor="#FF000020">
          Next
        </Button>
        <Button
          mode="contained-tonal"
          textColor="gray"
          buttonColor="transparent"
        >
          Already Have an Account?
        </Button>
      </View>
    </ThemeView>
  );
};

export default SignUp;
