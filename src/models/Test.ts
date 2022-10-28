import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    a:{type:String,required:true},
    b : {type:String,required:true},
    c : {type:String,required:true},
    expires: {type:Date,required:true,default:Date.now},
})


const Test = mongoose.model("Test",testSchema)
export default Test