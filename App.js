import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Places from "./screens/Places";
import Map from "./screens/Map";



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        
     <Stack.Screen name="My Places" component={Places} />
     <Stack.Screen name="Map" component={Map} />
   
    </Stack.Navigator>
  </NavigationContainer>
  );
}