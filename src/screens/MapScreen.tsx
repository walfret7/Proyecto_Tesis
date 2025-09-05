import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Estilo para ocultar POIs y transporte (Google Maps)
const HIDE_POI_STYLE = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
];

type Hospital = {
  id: string;
  name: string;
  address?: string;
  location?: { latitude: number; longitude: number }; // Firestore GeoPoint to plain obj
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [markers, setMarkers] = useState<Hospital[]>([]);

  // Carga hospitales desde Firestore
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "hospitals"));
      const list: Hospital[] = snap.docs
        .map((d) => {
          const data: any = d.data();
          const gp = data.location; // GeoPoint
          return {
            id: d.id,
            name: data.name,
            address: data.address,
            location: gp
              ? { latitude: gp.latitude, longitude: gp.longitude }
              : undefined,
          };
        })
        .filter((h) => !!h.location); // solo los que tienen coordenadas
      setMarkers(list);

      // Encadra todos los marcadores
      if (list.length && mapRef.current) {
        mapRef.current.fitToCoordinates(
          list.map((h) => h.location!) as any,
          { edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, animated: true }
        );
      }
    })();
  }, []);

  // Región fallback (por si no hay markers aún)
  const region = {
    latitude: -25.5163,
    longitude: -54.6111,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        customMapStyle={HIDE_POI_STYLE}      // 🔒 Oculta POIs Google
        showsUserLocation={false}            // ⬅️ ponlo en true si quieres ver el punto azul del usuario
        showsMyLocationButton={false}
        showsTraffic={false}
        showsBuildings={false}
        // iOS (Apple Maps) puede ocultar POIs con showsPointsOfInterest={false}
        {...(Platform.OS === "ios" ? { showsPointsOfInterest: false } : {})}
      >
        {markers.map((h) => (
          <Marker
            key={h.id}
            coordinate={h.location!}
            title={h.name}
            description={h.address || ""}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
