import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";

const FavouritesScreen = () => {
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
        <Text>Favourites</Text>
      </View>
    </SafeAreaView>
  );
};

export default FavouritesScreen;
