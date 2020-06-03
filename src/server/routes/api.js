import {Router} from "express";
import { userRoutes } from "./api/users"; 
import { projectRoutes } from "./api/projects";
import { taskRoutes } from "./api/tasks";

const router = Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

module.exports.apiRouter = router;