import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { api } from "../utils/api";

export const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Location task error:", error);
    return;
  }

  const { locations } = data as any;
  const loc = locations[0];

  if (!loc) return;

  const { latitude, longitude } = loc.coords;

  try {
    await api.post("/location/update", {
      latitude,
      longitude,
    });
   
  } catch (e) {
    console.error("Failed to send background location", e);
  }
});
