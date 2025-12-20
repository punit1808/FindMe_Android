import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../utils/api";
import * as Location from "expo-location";
import { LOCATION_TASK_NAME } from "../tasks/locationTask";


export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {

    const res = await api.post("/user/login", { email, password });

    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("token", res.data.token);

    setUser(res.data.user);

  };

  const signup = async (fullName: string, email: string, password: string) => {
    const res = await api.post("/user/register", { fullName, email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    try {

      const started = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      );
      if (started) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }

      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("groupId");

      setUser(null);
    } finally {
      
    }
  };

  useEffect(() => {
    api
      .get("/user")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, login, signup, logout };
}
