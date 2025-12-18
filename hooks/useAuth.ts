import { useEffect, useState } from "react";
import { api } from "../utils/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    setUser(res.data.user);
  };

  const signup = async (email: string, password: string) => {
    const res = await api.post("/signup", { email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, login, signup, logout };
}
