import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../utils/api";

export type Member = {
  _id: string;
  email: string;
  role: "admin" | "member";
  lat: number;
  lng: number;
  updatedAt: string;
};


export function useGroup(groupId: string,groupName: string) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
      try {
        
        const email = await SecureStore.getItemAsync("email");
        const res = await api.get(`/location/${email}/${groupName}`);
        console.log("Fetched members for group:", groupName);
        await SecureStore.setItemAsync("groupId", groupName);
        

        const mapped = res.data.map((m: any) => ({
          email: m.email,
          lat: m.latitude,
          lng: m.longitude,
          updatedAt: new Date(m.timestamp).toLocaleString(),
        }));

        setMembers(mapped);
      } catch (err) {
        console.error("Failed to fetch members", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!groupId) return;

    fetchMembers();

    fetchMembers();
  }, [groupId]);

  return { members, setMembers, loading, refresh: fetchMembers  };
}
