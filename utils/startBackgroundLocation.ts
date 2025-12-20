import * as Location from "expo-location";
import { Platform } from "react-native";
import { LOCATION_TASK_NAME } from "../tasks/locationTask";

export async function startBackgroundLocation() {
  if (Platform.OS !== "android") return;

  const started = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );

  if (started) return;

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000,
    distanceInterval: 20,
    foregroundService: {
      notificationTitle: "Location sharing active",
      notificationBody: "Your location is being shared",
    },
  });
}
