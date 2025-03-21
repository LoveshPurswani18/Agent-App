import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Agent from "@/models/agent.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();
  const { id } = req.query;

  try {
    await Agent.findByIdAndDelete(id);
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting agent", error });
  }
}