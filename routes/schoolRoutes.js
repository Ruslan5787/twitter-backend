// schoolRoutes.js
import express from "express";
import {
    createGroup,
    createSchool,
    deleteUser,
    getGroups,
    getGroupUsers,
    getSchool,
    getSchools,
} from "../controllers/schoolController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createSchool);
router.post("/group", protectRoute, createGroup);
router.get("/groups", protectRoute, getGroups);
router.get("/", protectRoute, getSchools);
router.get("/school/:id", protectRoute, getSchool);
router.get("/group_students/:id", protectRoute, getGroupUsers);
router.delete("/users/:id", protectRoute, deleteUser); // Новый маршрут

export default router;