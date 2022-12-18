import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    PerformanceMeasures,
    Simulation
} from '../screens'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#706677",
                    height: 50,
                    position: 'absolute',
                    elevation: 6,
                    bottom: 5,
                    left: 8,
                    right: 8,
                    borderRadius: 15,

                },
                tabBarInactiveTintColor: "#d6cfcb",
                tabBarActiveTintColor: "#e5989b",
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen 
                name="Simulation" 
                component={Simulation} 
                options={{
                    tabBarIcon: ({color, focused}) => (
                     <Entypo name={"hour-glass"} size={focused ? 24 : 20 } color={color} 
                     />
                    )
                }}
            />
            <Tab.Screen 
                name="PerformanceMeasures" 
                component={PerformanceMeasures} 
                options={{
                    tabBarIcon: ({color, focused}) => (
                     <FontAwesome5 name={"chart-bar"} size={focused ? 24 : 20 } color={color} />
                    )
                    
                }}
            />
        </Tab.Navigator>
    )
}


export default TabNavigation;