import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";

const OrdersScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Orders</Text>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;
