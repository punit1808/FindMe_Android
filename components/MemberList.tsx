import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Member = {
  _id: string;
  email: string;
  role: "admin" | "member";
  lat: number;
  lng: number;
  updatedAt: string;
};

export default function MemberList({
  members = [],
  onRemove,
}: {
  members?: Member[];
  onRemove?: (id: string) => void;
}) {
  // 🔹 Sample data fallback (for UI testing)
  const sampleMembers: Member[] = [
    {
      _id: "1",
      email: "jaideepy514@gmail.com",
      role: "member",
      lat: 30.7701383,
      lng: 76.5760218,
      updatedAt: "9/19/2025, 12:05:08 PM",
    },
    {
      _id: "2",
      email: "punityadav1808@gmail.com",
      role: "member",
      lat: 28.7278552,
      lng: 77.1449775,
      updatedAt: "12/13/2025, 4:08:06 PM",
    },
    {
      _id: "3",
      email: "takshakasdf@gmail.com",
      role: "member",
      lat: 30.7418508,
      lng: 76.6702864,
      updatedAt: "9/23/2025, 4:49:55 PM",
    },
  ];

  const data = members.length > 0 ? members : sampleMembers;

  return (
    <View style={styles.wrapper}>
      

      <View style={styles.card}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.email}>
                  {item.email} ({item.role})
                </Text>

                <Text style={styles.location}>
                  📍 {item.lat}, {item.lng}
                </Text>
              </View>

              <View style={styles.right}>
                <Text style={styles.time}>{item.updatedAt}</Text>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => onRemove?.(item._id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
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
});
