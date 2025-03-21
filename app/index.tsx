import { Text, View } from "react-native";
import SignupScreen from "../src/screens/SignupScreen";
import { useFonts } from "expo-font";
import AppNavigator from "../src/navigation/AppNavigator";


export default function Index() {
  const [fontsLoaded] = useFonts({
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  return <AppNavigator />;
}
