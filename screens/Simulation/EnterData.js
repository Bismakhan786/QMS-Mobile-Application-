import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import {
  avgTime,
  avgUtilizationRate,
  avgWaitingTimeWhoWait,
  interArrivalCalculation,
  startEndArrCalculation,
  timeCalculation,
  Simulation
} from "../../backend";
import CustomButton from "../../components/Button/CustomButton";
import Header from "../../components/Header/Header";

const EnterData = (props) => {
  const [arr, setArr] = useState(0);
  const [service, setService] = useState(0);
  const {simTime} = props.route.params

  const handleSubmit = () => {
    console.log(arr, service);
    const at = arr.split("\n").map((x) => Number(x));
    const st = service.split("\n").map((x) => Number(x));
    const interArrival = interArrivalCalculation(at);
    // const startEnd = startEndArrCalculation(arrivalTime, serviceTime);
    // const turnAroundTimeArr = timeCalculation(startEnd[1], arrivalTime);
    // const waitTimeArr = timeCalculation(turnAroundTimeArr, serviceTime);
    // const responseTimeArr = timeCalculation(startEnd[0], arrivalTime);
    const avgServiceTime = avgTime(st);
    // const avgTurnAroundTime = avgTime(turnAroundTimeArr);
    // const avgWaitingTime = avgTime(waitTimeArr);
    const avgInterArrivalTime = avgTime(interArrival);
    // const avgResponseTime = avgTime(responseTimeArr);
    // const waitTimeWhoWaitArr = avgWaitingTimeWhoWait(waitTimeArr);
    // const utilicationRate = avgUtilizationRate(startEnd[2], startEnd[3], startEnd[1][startEnd[1].length - 1])

    // console.log(
    //   "arrival: ",
    //   arrivalTime,
    //   "service: ",
    //   serviceTime,
    //   "interArrival",
    //   interArrival,
    //   "Start",
    //   startEnd[0],
    //   "End",
    //   startEnd[1],
    //   "Wait",
    //   waitTimeArr,
    //   "Response",
    //   responseTimeArr,
    //   "Turnaround",
    //   turnAroundTimeArr,
    //   "avgInterarrival",
    //   avgInterArrivalTime,
    //   "avgWait",
    //   avgWaitingTime,
    //   "avgResponse",
    //   avgResponseTime,
    //   "avgTurnaround",
    //   avgTurnAroundTime,
    //   "avgService",
    //   avgServiceTime,
    //   "wait time who wait",
    //   waitTimeWhoWaitArr,
    //   "utilization rate",
    //   utilicationRate
    // );

    const itas = Simulation(simTime, avgInterArrivalTime, avgServiceTime);
    const ita = itas[0];
    const serviceTime = itas[1];
    const arrivalTime = itas[2];
    const clock = itas[3];
    props.navigation.navigate("SimulationResult", {arrivalTime, serviceTime, simTime})
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
