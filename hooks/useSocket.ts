import { useEffect, useRef } from "react";
import { API_URL } from "../constants/env";

export function useWebSocket(
  groupId: string,
  setMembers: React.Dispatch<any>
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!groupId) return;
    if (socketRef.current) return; 

    const wsUrl =
      API_URL.replace(/^http/, "ws") +
      `/ws/location?groupId=${groupId}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🟢 WS connected for group", groupId);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setMembers((prev: any[]) =>
          prev.map((m) =>
            m.email === data.email
              ? {
                  ...m,
                  lat: data.latitude,
                  lng: data.longitude,
                  updatedAt: new Date(data.timestamp).toLocaleString(),
                }
              : m
          )
        );
      } catch (e) {
        console.error("WS parse error", e);
      }
    };

    socket.onerror = (e) => {
      console.error("🔴 WS error", e);
    };

    socket.onclose = () => {
      console.log("🔴 WS closed for group", groupId);
      socketRef.current = null;
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [groupId]); // ✅ ONLY groupId
}
