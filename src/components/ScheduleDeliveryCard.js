import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ScheduleDeliveryCard() {
  return (
    <LinearGradient
      colors={["#FFF9C4", "#F0F4C3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.cardContainer}
    >
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.scheduleText}>Schedule Food Delivery</Text>
            <Text style={styles.scheduleText1}>for Tomorrow</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/clock.png")}
              style={styles.calendarImage}
            />
          </View>
        </View>
      </View>

      <View style={styles.dotLine} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  textContainer: {
    flex: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  subtitleText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 4,
  },
  imageContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  calendarImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  dotLine: {
    height: 1,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#4CAF50",
    borderStyle: "dotted",
    marginTop: 5,
  },
  scheduleText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Manrope-SemiBold",
    lineHeight: 18,
    color: "#343434",
  },
  scheduleText1: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
    paddingTop: 5,
    color: "#343434",
  },
});
