import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import {} from "../../backend";
import PMcard from "../../components/Cards/PMcard";

const PerformanceResult = (props) => {
  const { rate_parameter } = props.route.params;

  const dataCards = [
    {
      id: 1,
      data: (rate_parameter.utilization * 100).toFixed(2) + " %",
      label: "Utilization Rate (ρ)",
    },
    {
      id: 2,
      data: rate_parameter.number_of_customer_in_queue.toFixed(2) + " customer",
      label: "Mean number of Customers in queue (Lq)",
    },
    {
      id: 3,
      data: rate_parameter.wait_in_queue.toFixed(2) + " min",
      label: "Mean Wait in the queue (Wq)",
    },
    {
      id: 4,
      data: rate_parameter.wait_in_system.toFixed(2) + " min",
      label: "Mean Wait in the system (Ws)",
    },
    {
      id: 5,
      data: rate_parameter.number_of_customer_in_system.toFixed(2) + " customer",
      label: "Mean number of Customers in the system (Ls)",
    },
    {
      id: 6,
      data: (rate_parameter.proportion_of_idletime * 100).toFixed(2) + " %",
      label: "Proportion of idle time of server",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header label={"Simulation Results"} showLabel={true} />

      <FlatList
        data={dataCards}
        renderItem={({ item, index }) => <PMcard item={item} key={index} />}
        numColumns={1}
        contentContainerStyle={{
          paddingBottom: 16,
          marginHorizontal: 16,
          marginTop: 8,
        }}
      />
      <View style={{ marginHorizontal: 16 }}></View>
    </SafeAreaView>
  );
};

export default PerformanceResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
