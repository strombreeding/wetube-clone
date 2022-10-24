import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    id:String,
    expires:Date,
    session : String,
})


const SessionData = mongoose.model("Session",sessionSchema)
export default SessionData