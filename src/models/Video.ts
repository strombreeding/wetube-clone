import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {type:String, trim:true,required:true, maxLength:35},
    description: {type:String, trim:true,required:true, minLength:10},
    createdAt : {type:Date, default:Date.now},
    hashtags : [{type:String,trim:true,}],
    meta : {
        views:{type:Number, default:1},
        rating : {type:Number, default:0},
    },
})
// videoSchema.pre("save", async function() {
//     console.log(this)
//     console.log(this.hashtags)
//     console.log(this.hashtags[0])
    

// })
const videoModel = mongoose.model("Video",videoSchema)
export default videoModel