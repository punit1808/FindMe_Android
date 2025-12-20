import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import AuthHero from "@/components/AuthHero";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!email || !password) return;

    try {
      setLoading(true);
      setError(null);

      
      await login(email, password);
      
      router.replace("/main/groups");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* 🔵 Hero Section */}
          <AuthHero />

          {/* 🧾 Form */}
          <View style={styles.form}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            {/* ❌ ERROR MESSAGE */}
            {error && <Text style={styles.error}>{error}</Text>}

            {/* ✅ LOGIN BUTTON */}
            <TouchableOpacity
              style={[
                styles.button,
                loading && { opacity: 0.7 },
              ]}
              onPress={submit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* 🔁 SWITCH TO SIGNUP */}
            <TouchableOpacity
              onPress={() => router.push("/auth/signup")}
              disabled={loading}
            >
              <Text style={styles.switchText}>
                Don’t have an account?{" "}
                <Text style={styles.switchLink}>Sign up</Text>
              </Text>
            </TouchableOpacity>

            {/* 📜 FOOTER */}
            <Text style={styles.footerText}>
              By continuing you agree to our{" "}
              <Text style={styles.link}>Terms</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 14,
  },
  footerText: {
    marginTop: 16,
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },
  link: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  switchText: {
    marginTop: 18,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  switchLink: {
    color: "#4f46e5",
    fontWeight: "600",
  },
});
