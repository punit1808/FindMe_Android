import { useEffect } from "react";
import { socket } from "../utils/socket";

export function useSocket(groupId: string) {
  useEffect(() => {
    if (!groupId) return;

    socket.connect();
    socket.emit("join-group", groupId);

    return () => {
      socket.emit("leave-group", groupId);
      socket.disconnect();
    };
  }, [groupId]);

  return socket;
}
