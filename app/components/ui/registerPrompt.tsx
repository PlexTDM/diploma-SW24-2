// RegisterPromptModal.tsx
import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, useTheme } from "react-native-paper";

interface RegisterPromptModalProps {
  visible: boolean;
  data: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const RegisterPromptModal = ({
  visible,
  data,
  onConfirm,
  onCancel,
}: RegisterPromptModalProps) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <Text variant="titleMedium" style={{ marginBottom: 10 }}>
          Register New Account?
        </Text>
        <Text>
          No account was found for the email:{" "}
          <Text style={{ fontWeight: "bold" }}>{data.email}</Text>. Would you
          like to register a new account?
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button onPress={onCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>
          <Button mode="contained" onPress={onConfirm}>
            Register
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default RegisterPromptModal;
