import { useEffect, useState } from "react";
import { api } from "../utils/api";

export function useGroups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    const res = await api.get("/groups");
    setGroups(res.data.groups);
  };

  const createGroup = async (name: string) => {
    const res = await api.post("/groups", { name });
    setGroups((prev) => [...prev, res.data.group]);
  };

  const deleteGroup = async (groupId: string) => {
    await api.delete(`/groups/${groupId}`);
    const res = await api.post("/groups", { name });
    setGroups((prev) => [...prev, res.data.group]);
  }

  useEffect(() => {
    fetchGroups().finally(() => setLoading(false));
  }, []);

  return { groups, loading, fetchGroups, createGroup, deleteGroup };
}
