import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TimeSimulation, Simulation } from "../../backend";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import Header from "../../components/Header/Header";

const EnterParameters = (props) => {
  const [lambda, setLambda] = useState(0);
  const [mu, setMu] = useState(0);
  const {simTime} = props.route.params;

  // console.log("Enter parameters");
  // add minutes on input
  // console.log(lambda, mu);

  const handleSubmit = () => {
    // console.log(lambda, mu);

    console.log(simTime)
    const itas = Simulation(simTime, lambda, mu);
    const ita = itas[0];
    const serviceTime = itas[1];
    const arrivalTime = itas[2];
    const clock = itas[3];

    console.log("interarrival time ", ita);
    console.log("arrival time ", arrivalTime);
    console.log("service time ", serviceTime);
    console.log("clock ", clock);
    console.log("last index", clock[clock.length - 1]);

    props.navigation.navigate("SimulationResult", {arrivalTime, serviceTime, simTime})
  };
  return (
    <ScrollView style={styles.container}>
      <Header label={"Enter Parameters"} showLabel={true} />
      <View style={styles.dataView}>
        <View style={styles.dataInput}>
          <View style={styles.input}>
            <Text style={styles.head}>
              Lambda (λ) or Avg Number of Arrivals
            </Text>
            <InputField
              label={""}
              keyboardType={"numeric"}
              onChangeText={(text) => setLambda(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.head}>Mu (µ) or Avg Service Time</Text>
            <InputField
              label={""}
              keyboardType={"numeric"}
              onChangeText={(text) => setMu(text)}
            />
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
          All the values should be numbers
        </Text>
      </View>
    </ScrollView>
  );
};

export default EnterParameters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dataView: {
    marginHorizontal: 16,
  },
  input: {
    marginBottom: "15%",
  },
  head: { fontWeight: "300", color: "#666", fontSize: 16 },
});
