import * as Location from "expo-location";
import { LOCATION_TASK_NAME } from "../tasks/locationTask";

export async function startBackgroundLocation() {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );

  if (hasStarted) return;

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000,
    distanceInterval: 20,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Location sharing active",
      notificationBody: "Your location is being shared",
    },
  });
}
