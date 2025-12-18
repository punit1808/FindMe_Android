import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // await logout();
    router.replace("/auth/login");
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.btn}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: "#dc2626", // red logout
    fontWeight: "600",
    fontSize: 14,
  },
});
