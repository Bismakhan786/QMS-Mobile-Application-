import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { arrivalTimeSim, mainSimmulation } from "../../backend";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import Header from "../../components/Header/Header";

const EnterParameters = (props) => {
  const [lambda, setLambda] = useState(0);
  const [mu, setMu] = useState(0);

  console.log("ENter parameters")
  // add minutes on input
  console.log(lambda, mu)

  const handleSubmit = () => {
    console.log(lambda, mu);
    const IaSt = mainSimmulation(2, Number(lambda), Number(mu))
    const interArrival = IaSt[0]
    const serviceTime = IaSt[1]
    const arrivalTime = arrivalTimeSim(interArrival)
    console.log("Arrival", arrivalTime, "Inter Arrival", interArrival, "Service", serviceTime)
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
