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
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import AuthHero from "@/components/AuthHero";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {

    // await signup(email, password);
    router.push("/auth/login");
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
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

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

            <TouchableOpacity style={styles.button} onPress={submit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* 🔁 SWITCH TO LOGIN */}
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text style={styles.switchText}>
                Already have an account?{" "}
                <Text style={styles.switchLink}>Login</Text>
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#4f46e5", // ✅ STANDARD COLOR
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
