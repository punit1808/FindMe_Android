import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";

const DELHI_REGION = {
  latitude: 28.6139,
  longitude: 77.2090,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

export default function LiveMap({ members }) {
  const initialRegionRef = useRef<any>(DELHI_REGION);
  const [ready, setReady] = useState(false);

  // Update initial region ONCE when first valid location appears
  useEffect(() => {
    const firstValid = members.find(
      m =>
        typeof m.lat === "number" &&
        typeof m.lng === "number" &&
        !Number.isNaN(m.lat) &&
        !Number.isNaN(m.lng)
    );

    if (firstValid && initialRegionRef.current === DELHI_REGION) {
      initialRegionRef.current = {
        latitude: firstValid.lat,
        longitude: firstValid.lng,
        latitudeDelta: 5,
        longitudeDelta: 5,
      };
    }
  }, [members]);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegionRef.current}
        onMapReady={() => setReady(true)}
      >
        {ready &&
          members
            .filter(
              m =>
                typeof m.lat === "number" &&
                typeof m.lng === "number" &&
                !Number.isNaN(m.lat) &&
                !Number.isNaN(m.lng)
            )
            .map(m => (
              <Marker
                key={m.email}
                coordinate={{
                  latitude: m.lat,
                  longitude: m.lng,
                }}
                title={m.email}
              />
            ))}
      </MapView>

      {/* Optional UX hint */}
      {members.length > 0 &&
        members.every(m => m.lat == null || m.lng == null) && (
          <View style={styles.overlay}>
            <Text style={styles.text}>
              Waiting for location updates…
            </Text>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
  },
});
