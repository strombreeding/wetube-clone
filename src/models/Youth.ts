import mongoose from "mongoose";
import bcrypt from "bcrypt";

const youthSchema = new mongoose.Schema({
  email: String,
  username: String,
  avatarUrl: String,
  ownTickets: [],
  crews: [],
  likes: [],
  ownComments: [],
  createdAt: { type: Date, default: Date.now },
  // subscribe : [{default:null,}],
});

const Youth = mongoose.model("Youth", youthSchema);
export default Youth;
