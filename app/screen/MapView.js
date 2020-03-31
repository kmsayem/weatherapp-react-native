import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image
  } from 'react-native';
import MapView,{ Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { kelvinToCelsius } from '../Lib';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const  MapViewScreen = ({currentCity}) => {
    const {
      name,
      weather,
      main,
      wind,
      coord:{
        lat, 
        lon
      }
    } = currentCity;

    const Description = ({title,value}) => (
      <Text style={styles.text}>{title}: {value}</Text>
    );

    return (
      <SafeAreaView>  
        <MapView  
          style={styles.mapStyle}  
          showsUserLocation={false}
          zoomEnabled={true}  
          zoomControlEnabled={true}  
          initialRegion={{  
            latitude: lat,   
            longitude: lon,  
            latitudeDelta: 0.0922,  
            longitudeDelta: 0.0421,  
          }}>  
  
          <Marker coordinate={{ latitude: lat, longitude: lon }} />
        </MapView>  
        <View style={styles.cityInfo}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.description}>
            <View>
              <Text style={styles.text}>{weather[0].description}</Text>
              <Description title={'Humidity'} value={main.humidity}/>
              <Description title={'Wind Speed'} value={wind.speed}/>
              <Description title={'Max. Temp'} value={kelvinToCelsius(main.temp_max)}/>
              <Description title={'Max. Temp'} value={kelvinToCelsius(main.temp_min)}/>
            </View>
            <View>
              <Text style={styles.temp}>{kelvinToCelsius(main.temp)}</Text>
              <Image
                style={styles.icon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView> 
    );
  
}

const styles = StyleSheet.create({  
  mapStyle: {
    height: DEVICE_HEIGHT-320
  },
  cityInfo:{
    height: 320,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily:'Roboto',
    fontWeight: 'bold'
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  text:{
    fontSize: 16,
    marginBottom: 10,
    fontFamily:'Roboto',
  },
  temp: {
    fontSize: 32,
    fontFamily:'Roboto',
    textAlign: 'center'
  },
  icon:{
    width: 150,
    height: 100
  }
});

const mapStateToProps = state => {
  return {
    currentCity: state.Weather.currentCity,
  }
}

export default connect(mapStateToProps)(MapViewScreen);