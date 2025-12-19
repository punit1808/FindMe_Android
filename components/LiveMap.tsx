import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Member = {
  email: string;
  lat: number;
  lng: number;
};

export default function LiveMap({ members }: { members: Member[] }) {
  if (!members || members.length === 0) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: members[0].lat,
          longitude: members[0].lng,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {members.map((m) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
