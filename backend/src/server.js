import "dotenv/config.js";
import app from "./index.js";
import { connectDB } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import chatSocket from "./sockets/chat.socket.js";
import { startKafkaWorker } from "./workers/kafka.worker.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
      }
    });

    chatSocket(io);
    app.set("io", io);
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      startKafkaWorker();
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
