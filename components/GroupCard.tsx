import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function GroupCard({
  group,
  onPress,
  onDelete,
}: {
  group: any;
  onPress: () => void;
  onDelete: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
       
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{group.name}</Text>
          <Text style={styles.meta}>
            Group ID: {group._id}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },
  deleteBtn: {
    backgroundColor: "#dc2626", 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
