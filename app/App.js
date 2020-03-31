import React,{ useEffect} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screen/Home';
import MapViewScreen from './screen/MapView';

const Stack = createStackNavigator();

const headerOption = { 
  title: 'WeatherApp' ,
  headerStyle: {
    backgroundColor: '#00804A',
  },
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily:'Roboto'
  },
}

const App = () => {

  useEffect(()=> {
    SplashScreen.hide();
  },[]);
  
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'#024629'} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="MapView"
            component={MapViewScreen}
            options={headerOption}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
