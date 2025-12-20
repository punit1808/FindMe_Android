import { useEffect, useRef } from "react";
import { API_URL } from "../constants/env";

export function useWebSocket(
  groupId: string,
  setMembers: React.Dispatch<any>
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!groupId) return;

    let isMounted = true; 

    const wsUrl =
      API_URL.replace(/^http/, "ws") +
      `/ws/location?groupId=${groupId}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🟢 WS connected", groupId);
    };

    socket.onmessage = (event) => {
      if (!isMounted) return;

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
      } catch {}
    };

    socket.onerror = (e) => console.log("WS error", e);
    socket.onclose = () => console.log("WS closed", groupId);

    return () => {
      isMounted = false;   
      socket.close();
      socketRef.current = null;
    };
  }, [groupId]);
}
