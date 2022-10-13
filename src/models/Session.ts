import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    expires:Date,
    session : String,
})


const SessionData = mongoose.model("Session",sessionSchema)
export default SessionData