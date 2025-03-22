import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

export default function CategoryListScreen({ navigation }) {
  // State to track favorite restaurants
  const [favorites, setFavorites] = useState({
    "calista-tavern-1": true,
  });

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sample restaurant data
  const restaurants = [
    {
      id: "bubbys-diner-1",
      name: "Bubby's Diner",
      location: "Terminal C - near gate 71",
      rating: 4.5,
      hours: "10:00 am - 8:30 pm",
      priceRange: "$10-20",
      delivery: "Delivers in 30 - 40 mins",
      image: require("../../assets/images/burger-fires.png"),
      available: true,
    },
    {
      id: "calista-tavern-1",
      name: "Calista Tavern",
      location: "Terminal C - near gate 71",
      rating: 4.5,
      hours: "10:00 am - 8:30 pm",
      priceRange: "$10-20",
      delivery: "Delivers in 30 - 40 mins",
      image: require("../../assets/images/burger-plate.png"),
      available: true,
    },
    {
      id: "calista-tavern-2",
      name: "Calista Tavern",
      location: "Terminal C - near gate 71",
      rating: 4.5,
      hours: "10:00 am - 8:30 pm",
      priceRange: "$10-20",
      delivery: "Delivers in 30 - 40 mins",
      image: require("../../assets/images/burger-plate.png"),
      available: true,
    },
    {
      id: "bubbys-diner-2",
      name: "Bubby's Diner",
      location: "Terminal C - near gate 71",
      rating: 4.5,
      hours: "10:00 am - 8:30 pm",
      priceRange: "$10-20",
      delivery: "Closed",
      image: require("../../assets/images/burger-fires.png"),
      available: false,
    },
    {
      id: "calista-tavern-3",
      name: "Calista Tavern",
      location: "Terminal C - near gate 71",
      rating: 4.5,
      hours: "10:00 am - 8:30 pm",
      priceRange: "$10-20",
      delivery: "Delivers in 30 - 40 mins",
      image: require("../../assets/images/burger-plate.png"),
      available: true,
    },
  ];

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesome key={i} name="star" size={20} color="#2E8B57" />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <FontAwesome key={i} name="star-half-o" size={20} color="#2E8B57" />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={20} color="#2E8B57" />
        );
      }
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#666" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>American</Text>

        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={[
              styles.restaurantCard,
              !restaurant.available && styles.unavailableCard,
            ]}
            disabled={!restaurant.available}
          >
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantLocation}>
                {restaurant.location}
              </Text>

              <View style={styles.ratingContainer}>
                {renderStars(restaurant.rating)}
              </View>

              <Text style={styles.restaurantHours}>
                {restaurant.hours} • {restaurant.priceRange}
              </Text>

              <Text
                style={[
                  styles.deliveryInfo,
                  restaurant.delivery === "Closed" && styles.closedText,
                ]}
              >
                {restaurant.delivery}
              </Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={restaurant.image}
                style={styles.restaurantImage}
                resizeMode="cover"
              />

              {!restaurant.available && (
                <View style={styles.unavailableOverlay}>
                  <Text style={styles.unavailableText}>Unavailable</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(restaurant.id)}
              >
                <Ionicons
                  name={favorites[restaurant.id] ? "heart" : "heart-outline"}
                  size={28}
                  color={favorites[restaurant.id] ? "#FF69B4" : "#333"}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  cartButton: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unavailableCard: {
    backgroundColor: "#f5f5f5",
  },
  restaurantInfo: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#343434",
    marginBottom: 5,
    fontFamily: "Manrope-Medium",
  },
  restaurantLocation: {
    fontSize: 12,
    color: "#343434",
    marginBottom: 10,
    fontFamily: "Manrope-Regular",
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  restaurantHours: {
    fontSize: 12,
    color: "#343434",
    marginBottom: 8,
    fontFamily: "Manrope-Regular",
    fontWeight: "500",
  },
  deliveryInfo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#007E5D",
    fontFamily: "Manrope-Bold",
  },
  closedText: {
    color: "#FF6B6B",
  },
  imageContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  unavailableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  unavailableText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Manrope-Bold",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 3,
  },
});
