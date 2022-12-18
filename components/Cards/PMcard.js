import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PMcard = (props) => {
  const { item } = props;
  return (
    <View key={item.id} style={styles.card}>
      <Text style={styles.cardTitle}>{item.label}</Text>
      <Text style={styles.cardData}>{item.data}</Text>
    </View>
  );
};

export default PMcard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: "300",
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center'
  },
  cardData: {
    color: "#843b62",
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#a84b7e",
    borderRadius: 16,
  },
});
