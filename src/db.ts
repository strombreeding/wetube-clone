import { RequestHandler } from "express";
import mongoose from "mongoose";

mongoose.connect(`${process.env.DB_URL}`);

export const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError: RequestHandler = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
//
