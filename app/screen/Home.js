import React,{useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  AppState,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import action from './../store/actions';
import PushNotification from "react-native-push-notification";
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { kelvinToCelsius } from '../Lib';
import appConfig from '../appConfig';

const { 
  get_cities_list,
  set_city
} = action;

const HomeScreen = ({ 
  navigation, 
  get_cities_list, 
  cities_list, 
  set_city
}) => {
  
  useEffect(()=> {

    PushNotification.configure({
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
      },
    });

    AppState.addEventListener('change', handleChange);

    get_cities_list();
    return () => {
      AppState.removeEventListener('change', handleChange);  
    }
  },[]);

  requestGeolocationPermission = async calback => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Weather App',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // this.setWallpaper();
        return calback(true);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to access your location',
        );
        return calback(false);
      }
    } catch (err) {
      // console.warn(err);
      return calback(false);
    }
  };

  
  const handleChange = (newState) => {
    requestGeolocationPermission(check => {
      if (check == true && newState !== "active") {
        getTemperatureByGeolocation();
      }
    });
  }

  const getTemperatureByGeolocation = () => {

    let setTime = new Date();
    setTime.setHours(10);
    // setTime.setMinutes(0);
    // console.log(setTime,new Date(Date.now() + 20 * 1000));
    Geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude}} = position;
      fetch(`${appConfig.apiUrl}weather?lat=${latitude}8&lon=${longitude}&appid=${appConfig.appId}`, {
        method: "GET"
      })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        let data = parsedRes;
        PushNotification.localNotificationSchedule({
          id: '123',
          smallIcon: "ic_launcher",
          largeIcon: "ic_stat_cloud_queue",
          repeatType: 'day',
          message: `Current Temperature: ${kelvinToCelsius(data.main.temp)}`, // (required)
          date: setTime
        });
      })
    });
  }

  const Item = ({ item }) => {
    const { name, weather, main} = item;
    return (
      <TouchableOpacity onPress={()=>selectedCity(item)}>
        <View style={styles.item}>
          <View style={{flexGrow: 1,flex: 1}}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{weather[0].description}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.temp}>{kelvinToCelsius(main.temp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const selectedCity = (item) => {
    set_city(item);
    navigation.navigate('MapView');
  };

  return (
    <SafeAreaView>
      <FlatList
        key={cities_list.length}
        data={cities_list}
        renderItem={({ item, index}) => <Item item={item} key={index}/>}
        keyExtractor = { (item, index) => index.toString() }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingHorizontal: 20,
    // marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily:'Roboto',
    flexWrap: 'wrap'
  },
  description:{
    fontSize: 14,
    marginTop: 10,
    fontFamily:'Roboto'
  },
  temp: {
    fontSize: 32,
    fontFamily:'Roboto'
  }
});


const mapStateToProps = state => {
  return {
    cities_list: state.Weather.cities_list
  }
}

const mapDispatchToProps = {
  get_cities_list,
  set_city
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);