import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMemo } from "react";

export default function LiveMap({ members }) {
  const validMembers = useMemo(
    () =>
      members.filter(
        m =>
          typeof m.lat === "number" &&
          typeof m.lng === "number" &&
          !Number.isNaN(m.lat) &&
          !Number.isNaN(m.lng)
      ),
    [members]
  );

  const region = useMemo(() => {
    if (validMembers.length === 0) return null;
    return {
      latitude: validMembers[0].lat,
      longitude: validMembers[0].lng,
      latitudeDelta: 5,
      longitudeDelta: 5,
    };
  }, [validMembers]);

  if (!region) return null;

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} region={region}>
        {validMembers.map(m => (
          <Marker
            key={m.email}
            coordinate={{
              latitude: m.lat,
              longitude: m.lng,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
