import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "../screens/SignupScreen";
import HomeTabs from "./HomeTabs"; // Bottom navigation with 5 tabs

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // Note: We don't need to manage the userToken here anymore
  // since we're handling that in the SignupScreen component

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
