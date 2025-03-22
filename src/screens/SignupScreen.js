import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Check if user is already logged in when component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          // User is already logged in, navigate to HomeTabs
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeTabs" }],
          });
        }

        // If no token, just stop loading and show the login screen
        setLoading(false);
      } catch (error) {
        console.error("Error checking login status:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array means this only runs once on mount

  // Timer effect for verification code resend
  useEffect(() => {
    let interval;

    if (showVerificationModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTime = prevTimer - 1;
          if (newTime === 0) {
            setIsResendDisabled(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showVerificationModal, timer]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#343434" />
      </View>
    );
  }

  const validateEmail = (text) => {
    // Email regex pattern for work/company emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
    setEmail(text);
  };

  const handleSendVerificationCode = () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    // Small delay to ensure keyboard is dismissed before showing modal
    setTimeout(() => {
      // Here you would typically make an API call to send the verification code
      // For now, we'll just show the modal
      setShowVerificationModal(true);
      // Reset timer and disable resend button
      setTimer(60);
      setIsResendDisabled(true);
    }, 100);
  };

  const handleResendCode = () => {
    // Here you would make an API call to resend the verification code
    console.log("Resending verification code to:", email);

    // Reset timer and disable resend button
    setTimer(60);
    setIsResendDisabled(true);
  };

  const handleSubmitVerificationCode = async () => {
    try {
      // Here you would typically verify the code with your API
      // For now, we'll just store a token
      await AsyncStorage.setItem("userToken", "dummyToken");

      // Close the modal
      setShowVerificationModal(false);

      // Reset the verification code
      setVerificationCode("");

      console.log("Login successful");

      // Navigate to HomeTabs using reset for a clean navigation state
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
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
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.button, { opacity: isValidEmail ? 1 : 0.4 }]}
              disabled={!isValidEmail}
              onPress={handleSendVerificationCode}
            >
              <Text style={styles.buttonText}>Send Verification Code</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Verification Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVerificationModal}
        onRequestClose={() => setShowVerificationModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 1 : 0}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Verify Email</Text>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#E8E8E8",
                  marginTop: 10,
                  marginBottom: 10,
                  opacity: 1,
                }}
              ></View>
              <ScrollView
                contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Image
                  source={require("../../assets/images/badge.png")}
                  style={{
                    width: 160,
                    height: 80,
                    alignSelf: "center",
                    margin: 20,
                  }}
                />
                <TextInput
                  placeholder="Enter verification code"
                  style={styles.verificationInput}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  autoFocus={true}
                  maxLength={6}
                />

                {/* Timer and Resend Button */}
                <View style={styles.timerContainer}>
                  {timer > 0 ? (
                    <Text style={styles.timerText}>
                      Resend code in {timer}s
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.resendButton,
                        { opacity: isResendDisabled ? 0.4 : 1 },
                      ]}
                      disabled={isResendDisabled}
                      onPress={handleResendCode}
                    >
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowVerificationModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      { opacity: verificationCode.length > 0 ? 1 : 0.4 },
                    ]}
                    disabled={verificationCode.length === 0}
                    onPress={handleSubmitVerificationCode}
                  >
                    <Text style={styles.verifyButtonText}>Verify</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDD388",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
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
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    color: "#343434",
  },
  button: {
    backgroundColor: "#343434",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 40,
    marginTop: 42,
    width: 196,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Manrope-Bold",
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#343434",
    fontFamily: "Manrope-Bold",
    textAlign: "left",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#343434",
    fontFamily: "Manrope-Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  verificationInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#EDD388",
    fontFamily: "Manrope-Light",
    fontSize: 14,
    color: "#343434",
    textAlign: "center",
    width: "80%",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  timerText: {
    fontSize: 14,
    color: "#343434",
    fontFamily: "Manrope-Regular",
  },
  resendButton: {
    padding: 8,
  },
  resendButtonText: {
    fontSize: 14,
    color: "#343434",
    fontFamily: "Manrope-SemiBold",
    textDecorationLine: "underline",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginTop: 10,
    marginBottom: 20,
    width: "80%",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#343434",
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#343434",
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    fontWeight: "700",
  },
  verifyButton: {
    backgroundColor: "#343434",
    borderRadius: 20,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    fontWeight: "700",
  },
});
export default SignupScreen;
