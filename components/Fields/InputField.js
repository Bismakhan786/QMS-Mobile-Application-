import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const InputField = ({
  label,
  icon,
  keyboardType,
  onChangeText,
  width,
  multiline,
  numberOfLines
}) => {
  return (
    <View
      style={{
        // flexDirection: "row",
        width: width,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        // marginBottom: 25,
      }}
    >
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={{
          flex: 1,
          paddingVertical: 0,
          fontSize: 14,
          fontWeight: 'bold'
        }}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputField;
