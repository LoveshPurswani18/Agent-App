import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Agent from "@/models/agent.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();
  const { id } = req.query;
  const { name, email, phone } = req.body;

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: "Error updating agent", error });
  }
}