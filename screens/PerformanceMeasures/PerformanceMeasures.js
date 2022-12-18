import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header/Header";
import CustomButton from "../../components/Button/CustomButton";
import InputField from "../../components/Fields/InputField";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const PerformanceMeasures = (props) => {
  const [currentQueueModel, setCurrentQueueModel] = useState("mm1");

  const handleSubmit = () => {
    props.navigation.navigate("PMEP", currentQueueModel);
  };

  return (
    <>
      <Header showLabel={true} label={"Performance Measures"} />
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          
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
                <RadioButtonItem
                  value="mg1"
                  label={<Text style={styles.radBtnTxt}>M/G/1</Text>}
                />
                <RadioButtonItem
                  value="mgc"
                  label={<Text style={styles.radBtnTxt}>M/G/C</Text>}
                />
                <RadioButtonItem
                  value="gg1"
                  label={<Text style={styles.radBtnTxt}>G/G/1</Text>}
                />
                
              </RadioButtonGroup>
            </View>
          </View>
          
          <View style={styles.bottomButton}>
            <CustomButton
              label={"Next"}
              width={"100%"}
              onPressFunction={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PerformanceMeasures;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: '17%'
  },
  inputContainer: {
    marginTop: 20, 
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
    marginBottom: 20
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
