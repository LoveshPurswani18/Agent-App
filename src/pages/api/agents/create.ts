import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Agent from "@/models/agent.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  const { name, email, phone, password } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) return res.status(400).json({ message: "Agent already exists" });

    const newAgent = new Agent({ name, email, phone, password });
    await newAgent.save();

    res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}