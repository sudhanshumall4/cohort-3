import mongoose from "mongoose"
import validator from "validator"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        reuired:true,
        minLength:3,
        maxLength:50
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:[
            validator.isEmail,
            "Invalid email address"
        ]
    },
    passwordHash:
    {
        type:String,
        required:true
    },
    refreshToken:
    {
        type:String,
    }
})
const userModel=mongoose.model("users2",userSchema);
export default userModel;