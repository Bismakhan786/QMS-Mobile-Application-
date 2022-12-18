import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

const Header = (props) => {
  return (
    <View>
      <StatusBar
        barStyle={"dark-content"}
        hidden={false}
        backgroundColor="white"
      />

      <View style={styles.headerContainer}>
        <View>
          {/* Header Title */}

          {props.showLabel && (
            <Text style={styles.headerTitle}>{props.label}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    paddingBottom: "5%",
    marginBottom: "5%",
    elevation: 6,
  },
  headerTitle: {
    color: "#38343a",
    fontWeight: "bold",
    fontSize: 16,
  },
});
