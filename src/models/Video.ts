import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {type:String, trim:true,required:true, maxLength:35},
    fileUrl:{type:String, required:true},
    description: {type:String, trim:true,required:true, minLength:10},
    createdAt : {type:Date, default:Date.now},
    hashtags : [{type:String,trim:true,}],
    views:{type:Number, default:1},
    owner : {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    
})


const videoModel = mongoose.model("Video",videoSchema)
export default videoModel