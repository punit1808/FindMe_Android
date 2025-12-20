import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { api } from "../../utils/api";
import { useState } from "react";

import LiveMap from "../../components/LiveMap";
import MemberList from "../../components/MemberList";
import AddMemberModal from "../../components/AddMemberModal";

import { useGroup } from "../../hooks/useGroup";
import { useWebSocket } from "../../hooks/useSocket";

export default function GroupScreen() {
  // grpId --> actual GrpName and grpName --> actual grpId
  const { groupId,groupName } = useLocalSearchParams<{ groupId: string, groupName: string }>();
  const [showAddMember, setShowAddMember] = useState(false);

  if (!groupId) return null;

  // 🔹 Initial HTTP fetch
  const { members, setMembers, loading, refresh } = useGroup(groupId,groupName);

 
  const handleRemoveMember = async (memberId: string) => {
  try {
    const removedBy = await SecureStore.getItemAsync("email");
    if (!removedBy) return;
    console.log("Removing member:", { removedBy, groupId, memberId });
    await api.delete("/group/removeUser", {
      data: {
        removedBy,
        userId: memberId,
        groupId: groupId, 
      },
      
    });

    refresh(); 
  } catch (err) {
    console.log("Failed to remove member", err);
  }
};


  useWebSocket(groupName, setMembers);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading group...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🗺 MAP */}
      {/* <View style={styles.mapContainer}>
        <LiveMap members={members} />
      </View> */}

      {/* 👥 HEADER */}
      <Text style={styles.heading}>Members</Text>

      {/* 👥 LIST (FlatList handles scrolling) */}
      <View style={styles.membersContainer}>
        <MemberList members={members} onRemove={handleRemoveMember}/>
      </View>

      {/* ➕ ADD MEMBER */}
      <TouchableOpacity
        style={styles.addMember}
        onPress={() => setShowAddMember(true)}
      >
        <Text style={styles.addText}>Add Member</Text>
      </TouchableOpacity>

      {/* ➕ MODAL */}
      <AddMemberModal
        groupId={groupId}
        groupName={groupName}
        visible={showAddMember}
        onClose={() => setShowAddMember(false)}
        onMemberAdded={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
  },

  membersContainer: {
    maxHeight: 500,
  },

  addMember: {
    backgroundColor: "#4f46e5",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
