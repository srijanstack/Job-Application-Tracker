import express from "express";
import {
  getJobs,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/jobcontroller.js";
import { authMiddleware } from "../middleware/userAuthorization.js";

const appRouter = express.Router();

appRouter.get("/", authMiddleware, getJobs);
appRouter.post("/createApplication", authMiddleware, createJobApplication);
appRouter.patch("/updateApplication", authMiddleware, updateJobApplication);
appRouter.delete("/deleteApplication", authMiddleware, deleteJobApplication);

export default appRouter;
