import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";

export default function App() {
 
  return (
    <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e8eb",
    alignItems: "center",
    justifyContent: "center",
  },
});
