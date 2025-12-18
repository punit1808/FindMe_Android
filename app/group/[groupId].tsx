import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import LiveMap from "../../components/LiveMap";
import MemberList from "../../components/MemberList";
import AddMemberModal from "../../components/AddMemberModal";

export default function GroupScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [showAddMember, setShowAddMember] = useState(false);

  if (!groupId) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* 🗺 MAP — LARGE & STABLE */}
      <View style={styles.mapContainer}>
        <LiveMap groupId={groupId} />
      </View>

      <Text style={styles.heading}>Members</Text>
      {/* 👥 MEMBERS (LIMITED HEIGHT, SCROLLABLE) */}
      <View style={styles.membersContainer}>
        <ScrollView showsVerticalScrollIndicator>
          <MemberList groupId={groupId} />
        </ScrollView>
      </View>

      {/* ➕ ADD MEMBER BUTTON (VISIBLE) */}
      <TouchableOpacity
        style={styles.addMember}
        onPress={() => setShowAddMember(true)}
      >
        <Text style={styles.addText}>Add Member</Text>
      </TouchableOpacity>

      <AddMemberModal
        groupId={groupId}
        visible={showAddMember}
        onClose={() => setShowAddMember(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 450, 
    width: "100%",
  },
  membersContainer: {
    maxHeight: 180,
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
  heading: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
  },
});
