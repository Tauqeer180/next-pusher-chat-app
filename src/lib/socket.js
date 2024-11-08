import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket Already Setup");
    res.end();
    return;
  }
  if (!res?.socket?.server?.io) {
    const io = new Server(res?.socket?.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("send-message", (msg) => {
        io.emit("get-message", msg); // Broadcast the message to all connected clients
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  res.end();
};

export default ioHandler;
