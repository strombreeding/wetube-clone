import mongoose from "mongoose";

const jwtSchema = new mongoose.Schema({
    username:String,
    refresh_token:String,
    createAt:{type:Date,expires:20,default:Date.now}
})
const JWT = mongoose.model("JWT",jwtSchema)
export default JWT