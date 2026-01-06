import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { api } from "../utils/api";
import * as SecureStore from "expo-secure-store";

type Role = "Admin" | "Member";

export default function AddMemberModal({
  groupId,
  groupName,
  visible,
  onClose,
  onMemberAdded,

}: {
  groupId: string;
  groupName:string;
  visible: boolean;
  onClose: () => void;
  onMemberAdded: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Member");

  const addMember = async () => {
  if (!email.trim()) return;

  try {
    const userId = email.trim();
    const addedBy = await SecureStore.getItemAsync("email");
    if (!addedBy) return;
    
    console.log("Adding member:", { addedBy, groupId,groupName, userId, role });
    await api.post("/group/addUser", {
      addedBy,
      userId,
      groupId,
      role,
    });
    console.log("member added successfully");
    onMemberAdded(); 
    setEmail("");
    setRole("Member");
    onClose();
  } catch (err) {
    console.log("failed to add member", err);
  }
};


  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.overlay}
        >
          <View style={styles.modal}>
           
            <Text style={styles.title}>Add Member</Text>

            <TextInput
              placeholder="User email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#959799ff" 
              selectionColor="#111827"
            />

            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "Member" && styles.roleActive,
                ]}
                onPress={() => setRole("Member")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "Member" && styles.roleTextActive,
                  ]}
                >
                  Member
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "Admin" && styles.roleActive,
                ]}
                onPress={() => setRole("Admin")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "Admin" && styles.roleTextActive,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={addMember}>
              <Text style={styles.primaryText}>Add Member</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    marginHorizontal: 4,
  },
  roleActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  roleText: {
    color: "#374151",
    fontWeight: "500",
  },
  roleTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#4f46e5", 
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelBtn: {
    marginTop: 30,
    alignItems: "center",
  },
  cancelText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
  },
});
