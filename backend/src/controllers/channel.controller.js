import { ChannelModel } from "../models/channel.model.js";
import Notification from "../models/notification.model.js";
import { checkUserOnline } from "../config/redis.js";

const getDmChannels = async (req, res) => {
  try {
    const userId = req.user._id;

    const dms = await ChannelModel.find({
      type: "dm",
      members: userId   
    })
      .populate("members", "username avatarUrl")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    // Map through the payload and fetch real-time Redis presence for every member
    const populatedDms = await Promise.all(dms.map(async (dm) => {
      const dmObj = dm.toObject();
      dmObj.members = await Promise.all(dmObj.members.map(async (member) => {
        const isOnline = await checkUserOnline(member._id.toString());
        return { ...member, isOnline };
      }));
      
      // Fetch unread count from MongoDB
      dmObj.unread = await Notification.countDocuments({
        channelId: dm._id,
        recipient: userId,
        type: 'NEW_MESSAGE'
      });
      
      return dmObj;
    }));

    res.status(200).json(populatedDms);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearNotifications = async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user._id;

    await Notification.deleteMany({
      channelId,
      recipient: userId
    });

    res.status(200).json({ message: "Notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDmChannels, clearNotifications }