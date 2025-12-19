import { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { api } from "../utils/api";

export function useGroups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const didFetch = useRef(false);

  const fetchGroups = async () => {
  setLoading(true);

  try {
    const email = await SecureStore.getItemAsync("email");
    if (!email) return;

    const res = await api.get(`/group/${email}`);

    
    const normalizedGroups = res.data.map((g: any) => ({
      _id: g.id,       
      name: g.name,
      members: g.members || [],
    }));

    setGroups(normalizedGroups);
  } catch (err) {
    console.error("Fetch groups failed:", err);
    setGroups([]);
  } finally {
    setLoading(false);
  }
};

const createGroup = async (grpName: string) => {
  setLoading(true);

  try{
    const email = await SecureStore.getItemAsync("email");
    if (!email) return;
    const res = await api.post('/group/create',{email, grpName});

    setLoading(false);
    fetchGroups();
  } catch(err){
    console.log("failed to create group", err);
    setLoading(false);
  }
};

const deleteGroup = async (groupId: string) => {
  Alert.alert(
    "Delete Group",
    `Are you sure you want to delete this group?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            const userId = await SecureStore.getItemAsync("email");
            if (!userId) return;
            
            await api.delete("/group/delete",{ data:  {userId, groupId}});
            
            fetchGroups(); 
          } catch (err) {
            console.log("failed to delete group", err);
          } finally {
            setLoading(false);
          }
        },
      },
    ]
  );
};



  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetchGroups();
  }, []);

  return { groups, loading, fetchGroups, createGroup, deleteGroup };
}
