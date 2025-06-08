import express from "express";
import {
    createGroup,
    createSchool, getGroups, getSchool,
    getSchools
} from "../controllers/schoolController.js";
import protectRoute from "../middlewares/protectRoute.js";
import {getUsersListForCorrespondence} from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protectRoute, createSchool);
router.post("/group", protectRoute, createGroup);
router.get("/groups", protectRoute, getGroups);
router.get("/", protectRoute, getSchools);
router.get("/school/:id", protectRoute, getSchool);

export default router;
