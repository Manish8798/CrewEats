import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";

const SearchScreen = () => {
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
        <Text>Search</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
