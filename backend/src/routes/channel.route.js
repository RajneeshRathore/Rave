import express from "express";
import { getDmChannels, clearNotifications } from "../controllers/channel.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dms", authMiddleware, getDmChannels);
router.delete("/notifications/:channelId", authMiddleware, clearNotifications);

export default router;
