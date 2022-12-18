import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { color } from "react-native-reanimated";

const AddressField = ({ inputLabel, inputValue }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.inputLabel}>{inputLabel}</Text>
      <TextInput style={styles.input} defaultValue={inputValue ? String(inputValue) : ""} selectionColor='#e38b37' />
    </View>
  );
};

export default AddressField;

const styles = StyleSheet.create({
  field: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  inputLabel: {
    color: "#666",
    marginVertical: 8,
  },
  input: {
    borderWidth: 0.3,
    borderColor: "#666",
    padding: 8,
    borderRadius: 5,
    color: "#6666",
  },
});
