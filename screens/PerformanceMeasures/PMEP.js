import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GG1, GGC, MG1, MM1, MMC } from "../../backend";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import Header from "../../components/Header/Header";

const PMEP = (props) => {
  const [lambda, setLambda] = useState(0);
  const [mu, setMu] = useState(0);
  const [sigmaST, setSigmaST] = useState(0);
  const [sigmaIA, setSigmaIA] = useState(0);
  const [servers, setServers] = useState(1);

  const queueModel = props.route.params;

  const handleSubmit = () => {
    let rate_parameter = {};
    queueModel === "mm1"
      ? (rate_parameter = MM1(lambda, mu))
      : queueModel === "mg1"
      ? (rate_parameter = MG1(lambda, mu, sigmaST))
      : queueModel === "gg1"
      ? (rate_parameter = GG1(lambda, mu, sigmaIA, sigmaST))
      : queueModel === "mmc"
      ? (rate_parameter = MMC(lambda, mu, sigmaIA, sigmaST, servers))
      : (rate_parameter = GGC(lambda, mu, sigmaIA, sigmaST, servers));

    props.navigation.navigate("PerformanceResult", { rate_parameter });
    console.log(lambda, mu, queueModel, sigmaIA, sigmaST, servers);
  };
  return (
    <ScrollView style={styles.container}>
      <Header label={"Enter Parameters"} showLabel={true} />
      <View style={styles.dataView}>
        <View style={styles.dataInput}>
          {queueModel === "mm1" ? (
            <>
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
            </>
          ) : queueModel === "mg1" ? (
            <>
              <View style={styles.input}>
                <Text style={styles.head}>Lambda (λ) or Avg Inter Arrival</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setLambda(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Mu (µ) or Mean of Service Time</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setMu(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Service Time
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaST(text)}
                />
              </View>
            </>
          ) : queueModel === "gg1" ? (
            <>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Lambda (λ) or Mean of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setLambda(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Mu (µ) or Mean of Service Time</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setMu(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaIA(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Service Time
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaST(text)}
                />
              </View>
            </>
          ) : queueModel === "mmc" ? (
            <>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Lambda (λ) or Mean of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setLambda(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Mu (µ) or Mean of Service Time</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setMu(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaIA(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Service Time
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaST(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Number of servers (c)</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setServers(text)}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Lambda (λ) or Mean of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setLambda(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Mu (µ) or Mean of Service Time</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setMu(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Inter Arrival
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaIA(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>
                  Sigma (σ2) or Variance of Service Time
                </Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setSigmaST(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.head}>Number of servers (c)</Text>
                <InputField
                  label={""}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setServers(text)}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.bottomButton}>
          <CustomButton
            label={"Calculate"}
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

export default PMEP;

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
