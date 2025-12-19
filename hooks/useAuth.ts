import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../utils/api";

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
    await api.post("/logout");
    setUser(null);
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
