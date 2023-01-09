import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import {
  avgTime,
  interArrivalCalculation,
  Simulation,
  arrivalTimeSim,
} from "../../backend";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import Header from "../../components/Header/Header";

const EnterData = (props) => {
  const [arr, setArr] = useState(0);
  const [service, setService] = useState(0);
  const { simTime, currentQueueModel } = props.route.params;
  const [servers, setServers] = useState(2);

  const handleSubmit = () => {
    console.log(arr, service);
    const at = arr.split("\n").map((x) => Number(x));
    const st = service.split("\n").map((x) => Number(x));
    const interArrival = interArrivalCalculation(at);
    const avgServiceTime = avgTime(st);
    const avgInterArrivalTime = avgTime(interArrival);


    const itas = Simulation(simTime, avgInterArrivalTime, avgServiceTime);
    const ita = itas[0];
    const serviceTime = itas[1];
    const arrivalTime = arrivalTimeSim(ita)
    props.navigation.navigate("SimulationResult", {
      arrivalTime,
      serviceTime,
      simTime,
      currentQueueModel,
      servers
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Header label={"Enter Data"} showLabel={true} />
      <View style={styles.dataView}>
        <View style={styles.dataInput}>
          <View style={{ width: "49%" }}>
            <Text style={styles.head}>Arrival Time</Text>
            <TextInput
              placeholder=""
              multiline
              numberOfLines={20}
              style={{
                padding: 10,
                textAlign: "center",
                borderColor: "#ccc",
                borderWidth: 1,
                marginBottom: 16,
                fontWeight: "600",
                fontSize: 14,
              }}
              onChangeText={(text) => setArr(text)}
            />
          </View>
          <View style={{ width: "49%" }}>
            <Text style={styles.head}>Service Time</Text>
            <ScrollView>
              <TextInput
                placeholder=""
                multiline
                numberOfLines={20}
                style={{
                  padding: 10,
                  textAlign: "center",
                  borderColor: "#ccc",
                  borderWidth: 1,
                  marginBottom: 16,
                  fontWeight: "600",
                  fontSize: 14,
                }}
                onChangeText={(text) => setService(text)}
              />
            </ScrollView>
          </View>
        </View>
        {currentQueueModel === "mmc" && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 6,
              marginHorizontal: 16,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ marginRight: 16, fontWeight: "bold", color: "#666" }}
            >
              Number of servers
            </Text>
            <InputField
              label={"2"}
              keyboardType={"numeric"}
              width={"60%"}
              onChangeText={(text) => setServers(text)}
            />
          </View>
        )}
        <View style={styles.bottomButton}>
          <CustomButton
            label={"Simulate"}
            width={"100%"}
            onPressFunction={handleSubmit}
          />
        </View>
        <Text
          style={{
            color: "red",
            marginTop: 10,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          All the values should be integer
        </Text>
      </View>
    </ScrollView>
  );
};

export default EnterData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dataView: {
    marginHorizontal: 16,
  },
  dataInput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  head: { fontWeight: "300", color: "#666", fontSize: 16, textAlign: "center" },
});
