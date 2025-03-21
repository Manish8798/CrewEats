import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Image
        source={require("../../assets/images/avatar.png")}
        style={styles.avatar}
      />
      <Text style={styles.title}>
        FREE Delivery Service for Crew & Airport employees
      </Text>
      <Text style={styles.subtitle}>
        Sign Up / Login using official email ID
      </Text>
      <TextInput
        placeholder="Enter your work email"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDD388",
    padding: 20,
  },
  logo: {
    width: 280,
    height: 60,
    alignSelf: "center",
  },
  avatar: {
    width: 240,
    height: 240,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 42,
    color: "#343434",
    fontFamily: "Manrope-Bold",
    marginHorizontal: 40,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 16,
    color: "#343434",
    fontFamily: "Manrope-Regular",
    marginHorizontal: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 40,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#fff",
    fontFamily: "Manrope-Light",
    fontSize: 14,
    color: "#343434",
  },
  button: {
    backgroundColor: "#343434",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 40,
    opacity: 0.4,
    marginTop: 42,
    width: "196",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    fontWeight: "700",
  },
});
export default SignupScreen;
