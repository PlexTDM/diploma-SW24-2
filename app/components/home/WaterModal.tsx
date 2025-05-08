import React from "react";
import { View, Text } from "react-native";
import { Modal } from "react-native";
import { ThemeView } from "@/components";

function WaterModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)} presentationStyle="pageSheet" animationType="slide">
      <ThemeView>
        <Text>WaterModal</Text>
      </ThemeView>
    </Modal>
  );
}

export default WaterModal;
