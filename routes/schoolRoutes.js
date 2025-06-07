import express from "express";
import {
    createSchool
} from "../controllers/schoolController.js";
import protectRoute from "../middlewares/protectRoute.js";
import {getUsersListForCorrespondence} from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protectRoute, createSchool);

export default router;
