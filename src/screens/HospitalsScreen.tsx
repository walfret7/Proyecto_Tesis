// src/screens/HospitalsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase"; // 👈 tu archivo firebase.ts o firebase.js

type Hospital = {
  id: string;
  name: string;
  address: string;
  emergency: boolean;
};

export default function HospitalsScreen() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "hospitals"), orderBy("name"), limit(50));
        const snap = await getDocs(q);
        setHospitals(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Hospital[]);
      } catch (e) {
        console.error("Error cargando hospitales:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando hospitales...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={hospitals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.address}</Text>
          {item.emergency ? <Text style={styles.emergency}>🚨 Emergencias 24h</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  item: { padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  name: { fontWeight: "bold", fontSize: 16 },
  emergency: { color: "red", marginTop: 4 },
});
