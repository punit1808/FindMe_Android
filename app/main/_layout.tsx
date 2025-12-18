import { Stack } from "expo-router";
import LogoutButton from "../../components/LogoutButton";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Find ME 📍",
        headerTitleAlign: "left",      
        headerRight: () => <LogoutButton />, 
      }}
    />
  );
}
