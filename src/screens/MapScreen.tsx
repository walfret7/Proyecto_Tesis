import React, { useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  useEffect(() => {
    const ask = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };
    ask();
  }, []);

  const region = {
    latitude: -25.5163,       // cambia por tu ciudad si quieres
    longitude: -54.6111,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{ latitude: -25.5163, longitude: -54.6111 }}
          title="Hospital de ejemplo"
          description="Marcador de prueba"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
