import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";
import { ChannelModel } from "../models/channel.model.js";
import cookie from "cookie";
import {
  setUserOnline,
  setUserOffline,
  invalidateChannelCache,
} from "../config/redis.js";
import { publishMessageEvent } from "../config/kafka.js";

const chatSocket = (io) => {
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      const token = cookies.accessToken;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      socket.userId = decoded.userId;
      console.log("no error");

      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("User connected:", socket.userId);
    await setUserOnline(socket.userId.toString());

    // Globally announce that this user is now online
    io.emit("user_online", socket.userId.toString());

    // const userId = socket.handshake.query.userId;
    socket.join(socket.userId.toString());
    socket.on("join_channel", ({ channelId }) => {
      socket.join(channelId);
      console.log(`Joined channel: ${channelId}`);
    });
    socket.on("send_message", async ({ channelId, content, attachment }) => {
      try {
        console.log("Attachment type:", typeof attachment);
        console.log("Attachment value:", attachment);
        console.log(
          "Attachment schema type:",
          Message.schema.path("attachment").instance,
        );
        const message = await Message.create({
          sender: socket.userId,
          channelId,
          content,
          attachment: attachment,
        });

        console.log("msg rec", message);
        const populatedMessage = await message.populate(
          "sender",
          "username avatarUrl",
        );

        // Fetch channel members to emit to their personal socket rooms
        const channel = await ChannelModel.findById(channelId);
        if (channel && channel.members) {
          channel.members.forEach((memberId) => {
            // Emitting to personal user rooms guarantees they receive it regardless of which DM tab is Open
            io.to(memberId.toString()).emit(
              "receive_message",
              populatedMessage,
            );
          });
        }

        // Publish to Kafka for offline notification processing
        await publishMessageEvent({
          messageId: message._id,
          channelId: channelId,
          content: content,
          sender: socket.userId,
        });

        // Invalidate the cache for this channel so the NEXT time someone opens the tab they get real fresh data!
        await invalidateChannelCache(channelId);
      } catch (error) {
        console.error("Send message error:", error.message);
      }
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.userId);
      await setUserOffline(socket.userId.toString());

      // Globally announce that this user dropped offline
      io.emit("user_offline", socket.userId.toString());
    });
  });
};

export default chatSocket;
