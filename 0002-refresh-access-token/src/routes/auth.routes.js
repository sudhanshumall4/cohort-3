import {Router} from "express";
import userModel from '../models/user.models.js'
import bcrypt from 'bcrypt';
const router=Router();

router.post('/register',async(req,res)=>
{
    const {name,email,password}=req.body;
    const isUserExists=await userModel.findOne({email})
    if(!isUserExists)
    {
        return res.status(400).json({
            message:"User already exists",
            errors:[
                {
                path:"email",
                message:"User already exists"
                }
            ]
        })
    }
const user=await userModel.create({
    name,
    email,
    passwordHash:await bcrypt.hash(password,10)
})
})


export default router;