import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Agent from "@/models/agent.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();
  const { id } = req.query;

  try {
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agent", error });
  }
}