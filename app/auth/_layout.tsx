import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Find ME 📍",
        headerTitleAlign: "center",
        headerBackVisible: false,
      }}
    />
  );
}
