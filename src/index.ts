require('dotenv').config();
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "./generated/prisma/client";

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
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(user);
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({ error: "Email already exists." });
      }
    }

    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});