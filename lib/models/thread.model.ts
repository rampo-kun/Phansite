import mongoose from "mongoose";
import { text } from "stream/consumers";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  community: {
    type: mongoose.Schema.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: { type: String },
  children: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
