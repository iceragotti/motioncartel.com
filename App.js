import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Hier die Imports zu deinen Dateien
import CreatorUpload from "./screens/CreatorUpload";
import DMChat from "./screens/DMChat";
import AppNavigation from "./src/navigation/AppNavigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="AppNavigation" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
        <Stack.Screen name="CreatorUpload" component={CreatorUpload} />
        <Stack.Screen name="DMChat" component={DMChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}