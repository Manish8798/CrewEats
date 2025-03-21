import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function HomeScreen() {
  const getFormattedDate = () => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(today);
  };

  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [deliveryType, setDeliveryType] = useState("Delivery");
  const [flightNumber, setFlightNumber] = useState("");

  const categories = [
    {
      id: 1,
      name: "American",
      icon: require("../../assets/images/burger.png"),
    },
    { id: 2, name: "Asian", icon: require("../../assets/images/ramen.png") },
    {
      id: 3,
      name: "Breakfast",
      icon: require("../../assets/images/coffee.png"),
    },
    { id: 4, name: "Italian", icon: require("../../assets/images/pizza.png") },
    {
      id: 5,
      name: "Mediterranean",
      icon: require("../../assets/images/wrap.png"),
    },
    {
      id: 6,
      name: "Desserts",
      icon: require("../../assets/images/dessert.png"),
    },
    {
      id: 7,
      name: "Seafood",
      icon: require("../../assets/images/seafood.png"),
    },
    { id: 8, name: "Vegan", icon: require("../../assets/images/avocado.png") },
  ];

  // For demonstration purposes only - use actual icons or images in a real app
  const getCategoryIcon = (name) => {
    const icons = {
      American: "🍔",
      Asian: "🍜",
      Breakfast: "☕",
      Italian: "🍕",
      Mediterranean: "🌯",
      Desserts: "🍩",
      Seafood: "🦐",
      Vegan: "🥑",
    };
    return icons[name] || "🍴";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>LGA</Text>
          <AntDesign name="down" size={16} color="black" />
        </View>
        <View style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>
            Help Us Get Your Order Right! 🍔✨
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FFF0BB",
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.datePickerContainer}>
            <TouchableOpacity style={styles.arrowButton}>
              <AntDesign name="left" size={14} color="#E8E8E8" />
            </TouchableOpacity>

            <Text style={styles.dateText}>{selectedDate}</Text>

            <TouchableOpacity style={styles.arrowButton}>
              <AntDesign name="right" size={14} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.deliveryOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryType === "Delivery" && styles.deliveryOptionSelected,
              ]}
              onPress={() => setDeliveryType("Delivery")}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryType === "Delivery" &&
                    styles.deliveryOptionTextSelected,
                ]}
              >
                Delivery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryType === "Pick Up" && styles.deliveryOptionSelected,
              ]}
              onPress={() => setDeliveryType("Pick Up")}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryType === "Pick Up" &&
                    styles.deliveryOptionTextSelected,
                ]}
              >
                Pick Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addFlightContainer}>
          <Text style={styles.addFlightTitle}>
            {deliveryType == "Delivery" ? "Add Flight" : "Time of Pickup"}
          </Text>
          <View style={styles.flightInputContainer}>
            <TextInput
              style={styles.flightInput}
              placeholder={
                deliveryType == "Delivery" ? "Enter flight number" : "Search"
              }
              value={flightNumber}
              onChangeText={setFlightNumber}
            />
            {deliveryType == "Delivery" ? (
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <AntDesign
                style={{ padding: 15 }}
                name="down"
                size={14}
                color="black"
              />
            )}
          </View>
          <TouchableOpacity style={styles.withoutFlightButton}>
            <Text style={styles.withoutFlightText}>
              Continue without flight
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>What would you like to order?</Text>

          <View style={styles.categoryGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  {/* <Text style={styles.categoryEmoji}>
                    {getCategoryIcon(category.name)}
                  </Text> */}
                  <Image source={category.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Restaurants</Text>
            <AntDesign
              name="right"
              size={16}
              color="black"
              style={styles.viewAllIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.scheduleButton}>
          <View>
            <Text style={styles.scheduleText}>Schedule Food Delivery</Text>
            <Text style={styles.scheduleText1}>for Tommorow</Text>
          </View>
          <Image
            style={styles.scheduleEmoji}
            source={require("../../assets/images/clock.png")}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 5,
    fontFamily: "Manrope-Medium",
  },
  cartContainer: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  bannerContainer: {
    backgroundColor: "#FFF0BB",
    padding: 15,
    marginHorizontal: 0,
    paddingTop: 20,
  },
  bannerText: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
    marginTop: 20,
  },
  datePickerContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  arrowButton: {
    padding: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 10,
    fontFamily: "Manrope-Medium",
    color: "#343434",
  },
  deliveryOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    // paddingBottom: 15,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B2BEB5",
  },
  deliveryOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 0,
  },
  deliveryOptionSelected: {
    backgroundColor: "#333333",
  },
  deliveryOptionText: {
    fontSize: 12,
    color: "#333",
  },
  deliveryOptionTextSelected: {
    color: "#fff",
  },
  addFlightContainer: {
    padding: 15,
    backgroundColor: "#FFF0BB",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  addFlightTitle: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    fontFamily: "Manrope-Regular",
  },
  flightInputContainer: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  flightInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Manrope-Regular",
    fontWeight: "400",
  },
  addButton: {
    backgroundColor: "#E8E8E880",
    paddingHorizontal: 10,
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 10,
    color: "#333",
    fontFamily: "Manrope-Regular",
    fontWeight: "500",
  },
  withoutFlightButton: {
    marginTop: 15,
    alignItems: "center",
  },
  withoutFlightText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "700",
    fontFamily: "Manrope-Medium",
    borderBottomWidth: 0.4,
    borderBottomColor: "#343434",
    marginBottom: 10,
  },
  menuSection: {
    padding: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
    fontFamily: "Manrope-Medium",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 30,
  },
  categoryName: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Manrope-Regular",
    fontWeight: "500",
  },
  viewAllButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Manrope-Regular",
  },
  viewAllIcon: {
    marginLeft: 5,
  },
  scheduleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE082",
  },
  scheduleText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Manrope-SemiBold",
  },
  scheduleText1: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Manrope-Regular",
  },
  scheduleEmoji: {
    fontSize: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
