import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import { error } from "node:console";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and Password Required" });
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword },
    });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7h",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ error: "Signup Failed" });
  }
}

export async function logIn(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and Password Required" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7h",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ error: "Login Failed" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(400).json({ error: "Not a user" });
  try {
    const deleted = await prisma.user.deleteMany({ where: { id: userId } });
    if (deleted.count === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Couldn't delete user" });
  }
}
