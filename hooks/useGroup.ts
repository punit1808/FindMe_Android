import { useEffect, useState } from "react";
import { api } from "../utils/api";

export function useGroup(groupId: string) {
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (!groupId) return;

    api.get(`/groups/${groupId}`).then((res) => {
      setGroup(res.data.group);
      setMembers(res.data.group.members || []);
    });

    api.delete(`/groups/${groupId}`).then((res) => {
      setGroup(res.data.group);
      setMembers(res.data.group.members || []);
    });
  }, [groupId]);

  return { group, members };
}
