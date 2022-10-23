import mongoose from "mongoose";
import bcrypt from "bcrypt"

const youthSchema = new mongoose.Schema({
  email :{type:String, trim:true, required:true,unique:true,maxlength:25},
  avatarUrl:{type:String, },
  nickname : {type:String, trim:true, maxlength:15},
  username : {type:String, trim:true, required:true},
  password1 : {type:String, trim:true, required:true, minlength:8,maxlength:15},
  own : [],
  subscriber : {type:Number},
  subscribe : [{type:String}],
  createdAt : {type:Date, default:Date.now},
  comments :[{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Comment"}]


  // subscribe : [{default:null,}],
})
youthSchema.pre('save', async function () {
  if(this.isModified("password1")){
    this.password1 = await bcrypt.hash(this.password1,10)
  }
} );



const Youth = mongoose.model("Youth",youthSchema)
export default Youth