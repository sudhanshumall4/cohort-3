import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
  name:
  {
    type:String,
    required:true,
    minlength:3,
    maxLength:50
  },
  email:
  {
    type:String,
    required:true,
    unique:true
  },
  password:
  {
     type: String,
    required: true,
    minlength:8
  }
},
  {
  timestamps:true
});

const userModel=mongoose.model("user",userSchema);
export default userModel;