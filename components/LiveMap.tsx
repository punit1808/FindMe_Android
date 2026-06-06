import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useMemo, useState, useRef } from "react";

const DELHI_REGION = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

export default function LiveMap({
  members,
  selectedMember,
}) {
  const [region, setRegion] = useState<any | null>(DELHI_REGION);
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef<MapView>(null);

  const validMembers = useMemo(
    () =>
      members.filter(
        (m) =>
          typeof m.lat === "number" &&
          typeof m.lng === "number" &&
          !Number.isNaN(m.lat) &&
          !Number.isNaN(m.lng)
      ),
    [members]
  );

  useEffect(() => {
    if (!validMembers.length) return;

    setRegion((prev) => {
      if (
        prev &&
        prev.latitude === validMembers[0].lat &&
        prev.longitude === validMembers[0].lng
      ) {
        return prev;
      }

      return {
        latitude: validMembers[0].lat,
        longitude: validMembers[0].lng,
        latitudeDelta: 5,
        longitudeDelta: 5,
      };
    });
  }, [validMembers]);

  useEffect(() => {
    if (!selectedMember) return;
    if (!mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: selectedMember.lat,
        longitude: selectedMember.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  }, [selectedMember]);

  if (!region) return null;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onMapReady={() => setMapReady(true)}
        provider="google"
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {mapReady &&
          validMembers.map((m) => (
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

      {validMembers.length === 0 && (
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
  container: {
    flex: 1,
  },

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