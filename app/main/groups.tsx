import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useGroups } from "../../hooks/useGroups";
import GroupCard from "../../components/GroupCard";
import AddGroupModal from "../../components/AddGroupModal";
import Loading from "../../components/Loading";
import { requestLocationPermissions } from "../../utils/locationPermissions";
import { startBackgroundLocation } from "../../utils/startBackgroundLocation";

export default function GroupsScreen() {
  const { groups, loading, createGroup, deleteGroup } = useGroups();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const startedRef = useRef(false);

  useEffect(() => {
    const initLocation = async () => {
      if (startedRef.current) return;

      const granted = await requestLocationPermissions();
      if (!granted) return;

      await startBackgroundLocation();
      startedRef.current = true;
    };

    initLocation();
  }, []);

  if (loading) return <Loading />;


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={groups}
        keyExtractor={(g) => g._id}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() =>
              router.push({
                pathname: "/group/[groupId]",
                params: { groupId: item.name, groupName: item._id },
              })
            }
            onDelete={() => deleteGroup(item.name)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#6b7280" }}>
            No groups yet. Create one!
          </Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.addText}>Create Group</Text>
          </TouchableOpacity>
        }
      />

      <AddGroupModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreate={createGroup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#4f46e5",
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
