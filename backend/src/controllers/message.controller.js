import Message from "../models/message.model.js";
import { ChannelModel } from "../models/channel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getCachedMessages, cacheMessages } from "../config/redis.js";

export const getChannelMessages = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { channelId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const channel = await ChannelModel.findOne({
      _id: channelId,
      members: currentUserId
    });

    if (!channel) {
      return res.status(403).json({
        message: "You are not part of this channel"
      });
    }

    // 1. Attempt to fetch from Redis Cache
    const cachedData = await getCachedMessages(channelId, page);
    if (cachedData) {
      console.log(`[Cache Hit] Serving Channel ${channelId} Page ${page} from Redis`);
      return res.status(200).json(cachedData);
    }

    // 2. Cache Miss - Fetch from Database directly
    console.log(`[Cache Miss] Querying MongoDB for Channel ${channelId} Page ${page}`);
    const messages = await Message.find({ channelId })
      .populate("sender", "username avatarUrl")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Ensure they are correctly ordered chronologically (oldest at top of view)
    const reversedMessages = messages.reverse();

    // 3. Store result in Redis for future requests
    await cacheMessages(channelId, page, reversedMessages);

    res.status(200).json(reversedMessages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
