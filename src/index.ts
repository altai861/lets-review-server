require('dotenv').config();
import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript server!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

app.post("/users", async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});