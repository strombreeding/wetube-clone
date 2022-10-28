import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    a:{type:String,require:true},
    b : {type:String,require:true},
    c : {type:String,require:true},
    expires: {type:Date,require:true,expires:10,default:Date.now},
})


const Test = mongoose.model("Test",testSchema)
export default Test