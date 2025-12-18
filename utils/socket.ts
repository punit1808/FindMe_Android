import { io, Socket } from "socket.io-client";
import { API_URL } from "../constants/env";

export const socket: Socket = io(API_URL, {
  transports: ["websocket"],
  autoConnect: false,
  withCredentials: true,
});
