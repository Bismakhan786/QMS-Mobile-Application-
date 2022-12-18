import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import EnterData from "../screens/Simulation/EnterData";
import EnterParameters from "../screens/Simulation/EnterParameters";
import PMEP from "../screens/PerformanceMeasures/PMEP";
import SimulationResult from "../screens/Simulation/SimulationResult";
import PerformanceResult from "../screens/PerformanceMeasures/PerformanceResult";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterData"
        component={EnterData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterParams"
        component={EnterParameters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PMEP"
        component={PMEP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SimulationResult"
        component={SimulationResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerformanceResult"
        component={PerformanceResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
