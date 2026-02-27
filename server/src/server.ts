import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import appRouter from "./routes/appilcationRoutes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
 
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use("/api/applications", appRouter)

app.get("/", (_req: Request, res: Response) => {
  res.send("RUNNING");
});

app.listen(PORT, () => console.log("server is running"));
