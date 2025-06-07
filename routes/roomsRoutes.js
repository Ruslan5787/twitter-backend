import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
    createRoom, getRoom, sendMessage, getRoomMessages, getUsersListForCorrespondence
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/:recipientId", protectRoute, getRoom)
router.post("/createRoom", protectRoute, createRoom)
router.post("/sendMessage", protectRoute, sendMessage)
router.get("/messages/:roomId", protectRoute, getRoomMessages)
// router.get("/recipients5252", protectRoute, getUsersListForCorrespondence)

export default router;
