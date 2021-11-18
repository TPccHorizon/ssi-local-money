import 'react-native-get-random-values'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import SendScreen from "./screens/SendScreen";
import SplashScreen from "./screens/SplashScreen";
import CreateWalletScreen from "./screens/CreateWalletScreen";
import ReceiveScreen from "./screens/ReceiveScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
        <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
