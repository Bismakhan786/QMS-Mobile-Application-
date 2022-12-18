import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import {
  avgTime,
  avgUtilizationRate,
  avgWaitingTimeWhoWait,
  interArrivalCalculation,
  startEndArrCalculation,
  timeCalculation,
} from "../../backend";
import PMcard from "../../components/Cards/PMcard";

const SimulationResult = (props) => {
  const arrivalTime = props.route.params.arrivalTime;
  const serviceTime = props.route.params.serviceTime;
  const interArrival = interArrivalCalculation(arrivalTime);
  const startEnd = startEndArrCalculation(arrivalTime, serviceTime);
  const turnAroundTimeArr = timeCalculation(startEnd[1], arrivalTime);
  const waitTimeArr = timeCalculation(turnAroundTimeArr, serviceTime);
  const responseTimeArr = timeCalculation(startEnd[0], arrivalTime);
  const avgServiceTime = avgTime(serviceTime);
  const avgTurnAroundTime = avgTime(turnAroundTimeArr);
  const avgWaitingTime = avgTime(waitTimeArr);
  const avgInterArrivalTime = avgTime(interArrival);
  const avgResponseTime = avgTime(responseTimeArr);
  const waitTimeWhoWaitArr = avgWaitingTimeWhoWait(waitTimeArr);
  const utilicationRate = avgUtilizationRate(
    startEnd[2],
    startEnd[3],
    startEnd[1][startEnd[1].length - 1]
  );
  const dataTable = [
    { id: 1, data: arrivalTime, label: "Arrival" },
    { id: 2, data: serviceTime, label: "Service" },
    { id: 3, data: interArrival, label: "Inter Arrival" },
    { id: 4, data: startEnd[0], label: "Start Time" },
    { id: 5, data: startEnd[1], label: "End Time" },
    { id: 6, data: waitTimeArr, label: "Wait Time" },
    { id: 7, data: responseTimeArr, label: "Response Time" },
    { id: 8, data: turnAroundTimeArr, label: "Turnaround Time" },
  ];

  const dataCards = [
    { id: 1, data: avgServiceTime.toFixed(2) + " min", label: "Avg Service Time" },
    { id: 2, data: avgTurnAroundTime.toFixed(2) + " min", label: "Avg Turnaround Time" },
    { id: 3, data: avgWaitingTime.toFixed(2) + " min", label: "Avg Waiting Time" },
    { id: 4, data: avgResponseTime.toFixed(2) + " min", label: "Avg Response Time" },
    { id: 5, data: avgInterArrivalTime.toFixed(2) + " min", label: "Avg Inter Arrival Time" },
    { id: 6, data: waitTimeWhoWaitArr.toFixed(2) + " min", label: "Wait Time of those who wait" },
    { id: 7, data: utilicationRate.toFixed(2) + " %", label: "Utilization Rate" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header label={"Simulation Results"} showLabel={true} />
      <View
        style={{
          marginHorizontal: 16,
          paddingVertical: 16,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#ccc",
        }}
      >
        <FlatList
          data={dataTable}
          renderItem={({ item, index }) => (
            <FlatList
              data={item.data}
              key={index}
              renderItem={({ item, index }) => (
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {item}
                </Text>
              )}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: 8,
                borderRightWidth: 1,
                paddingHorizontal: 16,
                borderRightColor: "#ccc",
              }}
              ListHeaderComponent={
                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 16,
                    textAlign: "center",
                    paddingBottom: 8,
                    marginBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  {item.label}
                </Text>
              }
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 16,
            //   marginHorizontal: 16,
            marginTop: 8,
          }}
        />
      </View>
      <FlatList
          data={dataCards}
          renderItem={({ item, index }) => (
            <PMcard item={item} key={index}/>
          )}
          numColumns={1}
          contentContainerStyle={{
            paddingBottom: 16,
              marginHorizontal: 16,
            marginTop: 8,
          }}
        />
      <View style={{ marginHorizontal: 16 }}>
        
      </View>
    </SafeAreaView>
  );
};

export default SimulationResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
