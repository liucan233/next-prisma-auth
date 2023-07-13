import { io, Socket } from "socket.io-client";

let tmp: Socket | null = null;

if (typeof window !== "undefined") {
    // tmp = io("http://localhost:5002");
}

export const socket = tmp;
