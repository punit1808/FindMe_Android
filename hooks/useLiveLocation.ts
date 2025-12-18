import { useEffect, useState } from "react";
import { getCurrentLocation } from "../utils/location";
import { useSocket } from "./useSocket";

export function useLiveLocation(groupId: string) {
  const socket = useSocket(groupId);

  const [myLocation, setMyLocation] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTracking = async () => {
      const loc = await getCurrentLocation();
      setMyLocation(loc);
      socket.emit("send-location", { groupId, ...loc });

      interval = setInterval(async () => {
        const updatedLoc = await getCurrentLocation();
        setMyLocation(updatedLoc);
        socket.emit("send-location", { groupId, ...updatedLoc });
      }, 5000); // same cadence as web
    };

    startTracking();

    socket.on("receive-locations", (data) => {
      setMembers(data);
    });

    return () => {
      clearInterval(interval);
      socket.off("receive-locations");
    };
  }, [groupId]);

  return { myLocation, members };
}
