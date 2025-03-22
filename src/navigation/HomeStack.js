import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryListScreen from "../screens/CategoryListScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryListScreen" component={CategoryListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
