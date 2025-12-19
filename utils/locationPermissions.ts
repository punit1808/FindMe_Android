import * as Location from "expo-location";

export async function requestLocationPermissions() {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== "granted") {
    throw new Error("Foreground location permission denied");
  }

  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== "granted") {
    console.warn("Background permission denied (foreground still works)");
  }
}
