import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  email :{type:String, trim:true, required:true,unique:true,maxlength:25},
  username : {type:String, trim:true, required:true},
  password1 : {type:String, trim:true, required:true,minlength:8,maxlength:15},
  password2 : {type:String, trim:true, required:true,minlength:8,maxlength:15},
  locatrion: {type:String}
})
userSchema.pre('save', async function () {
  this.password1 = await bcrypt.hash(this.password1, 5)
} );
const userModel = mongoose.model("User",userSchema)
export default userModel