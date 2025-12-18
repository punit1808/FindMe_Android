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

type Role = "admin" | "member";

export default function AddMemberModal({
  groupId,
  visible,
  onClose,
}: {
  groupId: string;
  visible: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("member");

  const addMember = async () => {
    if (!email.trim()) return;

    await api.post(`/groups/${groupId}/members`, {
      email: email.trim(),
      role, // 👈 send role to backend
    });

    setEmail("");
    setRole("member");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.overlay}
        >
          <View style={styles.modal}>
            {/* 🏷 Title */}
            <Text style={styles.title}>Add Member</Text>

            {/* ✉ Email */}
            <TextInput
              placeholder="User email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* 🔐 ROLE SELECTOR */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "member" && styles.roleActive,
                ]}
                onPress={() => setRole("member")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "member" && styles.roleTextActive,
                  ]}
                >
                  Member
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "admin" && styles.roleActive,
                ]}
                onPress={() => setRole("admin")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "admin" && styles.roleTextActive,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            {/* ✅ ACTIONS */}
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

  /* 🔐 Role styles */
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

  /* 🔘 Buttons */
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
