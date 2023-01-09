import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header/Header";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const Simulation = (props) => {
  const [currentDataFormat, setCurrentDataFormat] = useState("rd");
  const [currentQueueModel, setCurrentQueueModel] = useState("mm1");
  const [simHours, setSimHours] = useState(1);

  const handleSubmit = () => {
    const simTime = simHours * 60;
    currentDataFormat === "rd" ? props.navigation.navigate("EnterData", {simTime, currentQueueModel}) : props.navigation.navigate("EnterParams", {simTime});
    console.log(simHours)
  }

  return (
    <ScrollView style={styles.container}>
      <Header showLabel={true} label={"Simulation"} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputHead}>
            Select your preferred data format
          </Text>
          <View style={styles.optContainer}>
            <RadioButtonGroup
              containerStyle={{ marginBottom: 10 }}
              selected={currentDataFormat}
              onSelected={(value) => setCurrentDataFormat(value)}
              containerOptionStyle={{
                marginVertical: 4,
                alignItems: "center",
                backgroundColor: "whitesmoke",
                paddingVertical: 12,
                paddingHorizontal: 30,
              }}
              radioBackground="#843b62"
              radioStyle={{ width: 20, height: 20, marginRight: 8 }}
            >
              <RadioButtonItem
                value="rd"
                label={<Text style={styles.radBtnTxt}>Raw Data</Text>}
              />
              <RadioButtonItem
                value="rp"
                label={<Text style={styles.radBtnTxt}>Rate Parameter</Text>}
              />
            </RadioButtonGroup>
          </View>
        </View>
        <View>
          <Text style={styles.inputHead}>Select queuing model</Text>
          <View style={styles.optContainer}>
          <RadioButtonGroup
              containerStyle={{ marginBottom: 10 }}
              selected={currentQueueModel}
              onSelected={(value) => setCurrentQueueModel(value)}
              containerOptionStyle={{
                marginVertical: 4,
                alignItems: "center",
                backgroundColor: "whitesmoke",
                paddingVertical: 12,
                paddingHorizontal: 30,
              }}
              radioBackground="#843b62"
              radioStyle={{ width: 20, height: 20, marginRight: 8 }}
            >
              <RadioButtonItem
                value="mm1"
                label={<Text style={styles.radBtnTxt}>M/M/1</Text>}
              />
              <RadioButtonItem
                value="mmc"
                label={<Text style={styles.radBtnTxt}>M/M/C</Text>}
              />
            </RadioButtonGroup>
          </View>
        </View>
        <View>
          <Text style={styles.inputHead}>Simulation Time (in hours)</Text>
          <View style={styles.time}>
            <InputField label={"1"} keyboardType={"numeric"} width={"80%"} onChangeText={(text) => setSimHours(text)}/>
            <Text style={{ color: "#666" }}>hours</Text>
          </View>
        </View>
        <View style={styles.bottomButton}>
          <CustomButton label={"Next"} width={"100%"} onPressFunction={handleSubmit}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Simulation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  inputContainer: {
    marginHorizontal: 16,
  },
  inputHead: {
    fontWeight: "300",
    fontSize: 16,
    marginBottom: 10,
  },
  bottomButton: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  optContainer: {
    marginBottom: 16,
  },
  time: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radBtnTxt: { color: "#666", fontSize: 16, fontWeight: "300" },
});
