import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";


type Member = {
  _id: string;
  email: string;
  role: "admin" | "member";
  lat: number;
  lng: number;
  updatedAt: string;
};

export default function MemberList({
  members,
  onRemove,
}: {
  members: Member[];
  onRemove?: (id: string) => void;
}) {
    const copyCoordinates = async (lat: number, lng: number) => {
    const text = `${lat}, ${lng}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", "Coordinates copied to clipboard");
  };

  return (
    <View style={styles.card}>
      <FlatList
        data={members}
        keyExtractor={(item) => item.email}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.email}>
                {item.email}
              </Text>
              <View style={styles.locationRow}>
                <Text style={styles.location}>
                  📍 {item.lat}, {item.lng}
                </Text>

                <TouchableOpacity
                  onPress={() => copyCoordinates(item.lat, item.lng)}
                  style={styles.copyBtn}
                >
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.right}>
              <Text style={styles.time}>{item.updatedAt}</Text>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => onRemove?.(item.email)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  email: {
    fontSize: 14,
    fontWeight: "600",
  },
  location: {
    marginTop: 4,
    fontSize: 13,
    color: "#374151",
  },
  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  removeBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  removeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 14,
  },
  locationRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 4,
},

copyBtn: {
  marginLeft: 8,
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 6,
  backgroundColor: "#e5e7eb",
},

copyText: {
  fontSize: 12,
  color: "#111827",
  fontWeight: "500",
},

});
