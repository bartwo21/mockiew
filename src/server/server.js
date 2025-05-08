import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("test_message", (data) => {
    console.log(data);
    socket.broadcast.emit("test_message_response", data);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//https://github.com/machadop1407/socket-io-react-example
