import { useEffect } from "react";
import * as Location from "expo-location";
import { api } from "../utils/api";

export function useForegroundLocation(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let subscription: Location.LocationSubscription;

    const start = async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,    
          distanceInterval: 10,    
        },
        async (loc) => {
          const { latitude, longitude } = loc.coords;

          await api.post("/user/live", {
            latitude,
            longitude,
          });
        }
      );
    };

    start();

    return () => {
      subscription?.remove();
    };
  }, [enabled]);
}
