import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "../screens/SignupScreen";
import HomeTabs from "./HomeTabs"; // Bottom navigation with 5 tabs

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      setLoading(false);
      console.log("userToken", userToken);
    };
    checkUser();
  }, []);

  if (loading) return null; // Prevent flickering while checking login state

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Signup" component={SignupScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
