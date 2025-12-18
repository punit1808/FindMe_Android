import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useGroups } from "../../hooks/useGroups";
import GroupCard from "../../components/GroupCard";
import AddGroupModal from "../../components/AddGroupModal";
import Loading from "../../components/Loading";

export default function GroupsScreen() {
  const { groups, loading, createGroup, deleteGroup } = useGroups();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const sampleGroups = [
    {
      _id: "sample-1",
      name: "College Friends",
      members: [{}, {}, {}],
    },
    {
      _id: "sample-2",
      name: "Office Team",
      members: [{}, {}],
    },
    {
      _id: "sample-3",
      name: "Trip to Manali",
      members: [{}, {}, {}, {}],
    },
  ];

  const data = groups.length > 0 ? groups : sampleGroups;

  if (loading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(g) => g._id}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() =>
              router.push({
                pathname: "/group/[groupId]",
                params: { groupId: item._id },
              })
            }
            onDelete={() => {
              // prevent delete on sample groups
              if (item._id.startsWith("sample")) return;
              deleteGroup(item._id);
            }}
          />
        )}
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
