import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import {
  avgTime,
  avgUtilizationRate,
  avgWaitingTimeWhoWait,
  interArrivalCalculation,
  proportion_of_idletime_MMC,
  startEndArrCalculation,
  strtEnd_M_M_C,
  timeCalculation,
  utilizationRateMMC,
} from "../../backend";
import PMcard from "../../components/Cards/PMcard";
import windowHeight from "../../utils/Dimension";

const SimulationResult = (props) => {
  const { arrivalTime, serviceTime, simTime, currentQueueModel, servers } =
    props.route.params;
  const interArrival = interArrivalCalculation(arrivalTime);
  const startEndMM1 = startEndArrCalculation(arrivalTime, serviceTime);
  const startEndMMC = strtEnd_M_M_C(arrivalTime, serviceTime, servers);
  
  // const startEnd =
  //   currentQueueModel === "mm1"
  //     ? startEndArrCalculation(arrivalTime, serviceTime)
  //     : strtEnd_M_M_C(arrivalTime, serviceTime, servers);
  
  // MM1
  const turnAroundTimeArr = timeCalculation( currentQueueModel === "mm1" ? startEndMM1[1] : startEndMMC[2], arrivalTime);
  const waitTimeArr = timeCalculation(turnAroundTimeArr, serviceTime);
  const responseTimeArr = timeCalculation(currentQueueModel === "mm1" ? startEndMM1[0] : startEndMMC[1], arrivalTime);
  
  //MMC

  // const turnAroundTimeArr = timeCalculation(startEndMMC[2], arrivalTime);
  // const waitTimeArr = timeCalculation(turnAroundTimeArr, serviceTime);
  // const responseTimeArr = timeCalculation(startEndMMC[1], arrivalTime);

  const avgServiceTime = avgTime(serviceTime);
  const avgTurnAroundTime = avgTime(turnAroundTimeArr);
  const avgWaitingTime = avgTime(waitTimeArr);
  const avgInterArrivalTime = avgTime(interArrival);
  const avgResponseTime = avgTime(responseTimeArr);
  const waitTimeWhoWaitArr = avgWaitingTimeWhoWait(waitTimeArr);
  // const utilicationRateMM1 = avgUtilizationRate(
  //   startEnd[2],
  //   startEnd[3],
  //   startEnd[1][startEnd[1].length - 1]
  // )
  // const utilicationRateMMC = utilizationRateMMC(startEnd[0], serviceTime, servers)
  const utilizationRate =
  currentQueueModel === "mm1"
    ?  avgUtilizationRate(
        startEndMM1[2],
        startEndMM1[3],
        startEndMM1[1][startEndMM1[1].length - 1]
      )
    : null;

    console.log("Utilization rate array: ", utilizationRateMMC(startEndMMC[0], serviceTime, servers))
  // let prop_idle_MMC = [];
  // currentQueueModel === "mmc"
  //   ? (prop_idle_MMC = proportion_of_idletime_MMC(utilicationRateMMC))
  //   : null;
  
  // console.log("servers: ", servers)
  // console.log("server array: ", startEnd[0])
  // console.log("service array: ", serviceTime)
  let dataTable = 
  currentQueueModel === "mm1"
    ? ([
        { id: 1, data: arrivalTime, label: "Arrival" },
        { id: 2, data: serviceTime, label: "Service" },
        { id: 3, data: interArrival, label: "Inter Arrival" },
        { id: 4, data: startEndMM1[0], label: "Start Time" },
        { id: 5, data: startEndMM1[1], label: "End Time" },
        { id: 6, data: waitTimeArr, label: "Wait Time" },
        { id: 7, data: responseTimeArr, label: "Response Time" },
        { id: 8, data: turnAroundTimeArr, label: "Turnaround Time" },
      ])
    : ([
        { id: 1, data: arrivalTime, label: "Arrival" },
        { id: 2, data: serviceTime, label: "Service" },
        { id: 3, data: interArrival, label: "Inter Arrival" },
        // { id: 4, data: startEndMMC[0], label: "Server" },
        { id: 5, data: startEndMMC[1], label: "Start Time" },
        { id: 5, data: startEndMMC[2], label: "End Time" },
        { id: 6, data: waitTimeArr, label: "Wait Time" },
        { id: 7, data: responseTimeArr, label: "Response Time" },
        { id: 8, data: turnAroundTimeArr, label: "Turnaround Time" },
      ]);

  const dataCards = currentQueueModel === "mm1" ? [
    {
      id: 1,
      data: avgServiceTime.toFixed(2) + " min",
      label: "Avg Service Time",
    },
    {
      id: 2,
      data: avgTurnAroundTime.toFixed(2) + " min",
      label: "Avg Turnaround Time",
    },
    {
      id: 3,
      data: avgWaitingTime.toFixed(2) + " min",
      label: "Avg Waiting Time",
    },
    {
      id: 4,
      data: avgResponseTime.toFixed(2) + " min",
      label: "Avg Response Time",
    },
    {
      id: 5,
      data: avgInterArrivalTime.toFixed(2) + " min",
      label: "Avg Inter Arrival Time",
    },
    {
      id: 6,
      data: waitTimeWhoWaitArr.toFixed(2) + " min",
      label: "Wait Time of those who wait",
    },
    {
      id: 7,
      data: utilizationRate.toFixed(2),
      label: "Utilization Rate",
    }
  ] : [
    {
      id: 1,
      data: avgServiceTime.toFixed(2) + " min",
      label: "Avg Service Time",
    },
    {
      id: 2,
      data: avgTurnAroundTime.toFixed(2) + " min",
      label: "Avg Turnaround Time",
    },
    {
      id: 3,
      data: avgWaitingTime.toFixed(2) + " min",
      label: "Avg Waiting Time",
    },
    {
      id: 4,
      data: avgResponseTime.toFixed(2) + " min",
      label: "Avg Response Time",
    },
    {
      id: 5,
      data: avgInterArrivalTime.toFixed(2) + " min",
      label: "Avg Inter Arrival Time",
    },
    {
      id: 6,
      data: waitTimeWhoWaitArr.toFixed(2) + " min",
      label: "Wait Time of those who wait",
    },
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
          height: "40%",
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 16 }}>
          Simulation Time{" "}
          <Text style={{ color: "#843b62", fontWeight: "bold" }}>
            {simTime}
          </Text>{" "}
          mins
        </Text>
        <FlatList
          data={dataTable}
          renderItem={({ item, index }) => (
            <FlatList
              data={item.data}
              key={index}
              renderItem={({ item, index }) => (
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {item.toFixed(0)}
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
      <View
        style={{
          marginHorizontal: 16,
          paddingVertical: 16,
          height: "48%",
          paddingBottom: 16,
        }}
      >
        <FlatList
          data={dataCards}
          renderItem={({ item, index }) => <PMcard item={item} key={index} />}
          numColumns={1}
          contentContainerStyle={{
            paddingBottom: 16,
          }}
        />
        
      </View>
    </SafeAreaView>
  );
};

export default SimulationResult;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: "white",
  },
});
