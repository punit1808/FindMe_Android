import { useEffect, useState } from "react";
import { api } from "../utils/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const res = await api.post("/user/login", { email, password });
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
      .get("/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, login, signup, logout };
}
