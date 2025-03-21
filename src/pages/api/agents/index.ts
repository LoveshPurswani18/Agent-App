import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Agent from "@/models/agent.models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  try {
    const agents = await Agent.find().select("-password");
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}