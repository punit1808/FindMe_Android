import * as Location from "expo-location";
import { Platform } from "react-native";

export async function requestLocationPermissions() {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (!fg.granted) {
    return false;
  }

  if (Platform.OS === "android") {
    const bg = await Location.requestBackgroundPermissionsAsync();
    
    if (!bg.granted) {
      console.warn("Background permission denied");
    }
  }

  return true;
}
