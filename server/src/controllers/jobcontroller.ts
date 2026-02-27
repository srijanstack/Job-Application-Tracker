import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export async function getJobs(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Not Authenticated" });
  try {
    const jobs = await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedAt: "desc" },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
}

export async function createJobApplication(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Not Authenticated" });
  const { companyName, role, location, jobType, jobUrl, salaryRange, notes } =
    req.body;
  try {
    const application = await prisma.jobApplication.create({
      data: {
        companyName,
        role,
        location,
        jobType,
        jobUrl,
        salaryRange,
        notes,
        userId,
      },
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to create application" });
  }
}

export async function updateJobApplication(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Not Authenticated" });
  const { status, notes, id } = req.body;
  try {
    const application = await prisma.jobApplication.updateMany({
      where: { id, userId },
      data: { status, notes },
    });
    if (application.count === 0) {
      return res
        .status(404)
        .json({ error: "Application not found or not yours" });
    }
    res.status(200).json(application)
  } catch (err) {
    res.status(500).json({ error: "Couldn't Update Data" });
  }
}

export async function deleteJobApplication(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: "Not Authenticated" });
  const { id } = req.body;
  try {
    const deleted = await prisma.jobApplication.deleteMany({
      where: { id, userId },
    });
    if (deleted.count === 0) {
      return res
        .status(404)
        .json({ error: "Application not found or not yours" });
    }
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Couldn't delete the application" });
  }
}
