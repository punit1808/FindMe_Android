import { useEffect } from "react";
import * as Location from "expo-location";
import { api } from "../utils/api";
import * as secureStore from "expo-secure-store";

export function useForegroundLocation(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let subscription: Location.LocationSubscription;

    const start = async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,    
          distanceInterval: 0,    
        },
        async (loc) => {
          const { latitude, longitude } = loc.coords;
          const userId = await secureStore.getItemAsync("email");
          
          const lat = latitude;
          const lng = longitude;
          console.log("Foreground location update:", {userId, lat, lng });
          await api.post("/location/update", {
            userId,
            lat,
            lng,
          });
          console.log("Foreground location sent to server");
        }
      );
    };

    start();

    return () => {
      subscription?.remove();
    };
  }, [enabled]);
}
