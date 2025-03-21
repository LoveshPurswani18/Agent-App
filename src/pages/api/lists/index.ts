import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import List from "@/models/list.models";
import Agent from "@/models/agent.models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  try {
    const lists = await List.find()
      .populate({
        path: "records.assignedAgent",
        select: "name email phone",
      })
      .lean();

    console.log("Fetched Lists with Assigned Agents:", JSON.stringify(lists, null, 2));
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Error fetching lists", error });
  }
}
