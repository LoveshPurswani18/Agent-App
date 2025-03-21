import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import connectDB from "@/lib/db";
import List from "@/models/list.models";
import Agent from "@/models/admin.models";
import csv from "csv-parser";

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  const form = formidable({
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(500).json({ message: "File upload error", error: err });

    const file = files.file?.[0];
    if (!file || !file.filepath) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file path" });
    }

    const originalFilename = file.originalFilename || "uploaded_file.csv";
    const filePath = path.join(
      process.cwd(),
      "public/uploads",
      originalFilename
    );

    try {
      fs.renameSync(file.filepath, filePath);

      const records: any[] = [];
      const agents = await Agent.find(); // Fetch all existing agents from MongoDB
      console.log("Available Agents for Assignment:", agents);

      if (agents.length === 0) {
        return res
          .status(400)
          .json({ message: "No agents available for task distribution" });
      }

      let agentIndex = 0; // Start distributing tasks to agents in a round-robin fashion

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          if (row.FirstName && row.Phone) {
            const assignedAgent = agents[agentIndex % agents.length]._id; // Assigning an agent

            console.log(
              `Assigning ${row.FirstName} to agent ID: ${assignedAgent}`
            );

            records.push({
              firstName: row.FirstName,
              phone: row.Phone,
              notes: row.Notes || "",
              assignedAgent: assignedAgent, 
            });

            agentIndex++;
          }
        })
        .on("end", async () => {
          console.log("CSV processing finished, saving to DB...");
          console.log("Parsed Records:", records);

          try {
            if (records.length === 0) {
              return res
                .status(400)
                .json({ message: "No records found in CSV file" });
            }

            const newList = new List({ filename: originalFilename, records });
            await newList.save();

            return res
              .status(201)
              .json({ message: "File uploaded & processed successfully!" });
          } catch (error) {
            console.error("Database Save Error:", error);
            return res
              .status(500)
              .json({ message: "Error saving to database", error });
          }
        })
        .on("error", (error) => {
          console.error("CSV Processing Error:", error);
          return res
            .status(500)
            .json({ message: "Error processing CSV file", error });
        });
    } catch (error) {
      console.error("File Handling Error:", error);
      return res
        .status(500)
        .json({ message: "Error handling file upload", error });
    }
  });
}
