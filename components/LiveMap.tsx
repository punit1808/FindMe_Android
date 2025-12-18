import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LiveMap({ groupId }: { groupId: string }) {
  const sampleMembers = [
    {
      _id: "1",
      email: "jaideepy514@gmail.com",
      latitude: 30.7701383,
      longitude: 76.5760218,
    },
    {
      _id: "2",
      email: "punityadav1808@gmail.com",
      latitude: 28.7278552,
      longitude: 77.1449775,
    },
    {
      _id: "3",
      email: "takshakasdf@gmail.com",
      latitude: 30.7418508,
      longitude: 76.6702864,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 30.7333,
          longitude: 76.7794,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {sampleMembers.map((m) => (
          <Marker
            key={m._id}
            coordinate={{
              latitude: m.latitude,
              longitude: m.longitude,
            }}
            title={m.email}
          />
        ))}
      </MapView>
    </View>
  );
}
