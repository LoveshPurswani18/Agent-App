import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const ListSchema = new mongoose.Schema({
  filename: String,
  records: [RecordSchema],
});

export default mongoose.models.List || mongoose.model("List", ListSchema);
