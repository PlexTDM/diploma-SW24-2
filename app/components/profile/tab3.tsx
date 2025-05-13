import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-paper";
import { useAppTheme } from "@/lib/theme";
import { ThemeView, ThemeText } from "@/components";
import { Image } from "expo-image";

export default function tab3() {
  return (
    <ThemeView>
      <ThemeView>
        <Image
          source={require("@/assets/img/duel1.png")
          }
          style={{
            width: 100,
            height: 100,
            marginTop: 20,
          }}
        />
      </ThemeView>
    </ThemeView>
  );
}
