import express from 'express'
import jwt from "jsonwebtoken"
import userModel from '../models/user.models.js';
import {authenticate} from '../middleware/auth.middleware.js';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();
const app=express();
app.use(express.json());
app.get("/api",(req,res)=>
{
    res.status(200).json({
        message:"Welcome to the authentication API"
    })
});
app.post("/api/auth/register",async(req,res)=>
{
    const {email,name,password}=req.body;
    const user=await userModel.create({
        email,
        name,
        password:await bcrypt.hash(password,10)
    });
    const token=jwt.sign(
        {
               id:user._id
        }, 
    process.env.JWT_SECRET,
    )
    res.status(201).json({
        message:"user created successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                id: user._id
            },
            token:token
        }
    })
});
app.get("/api/auth/me",authenticate, async(req,res)=>
{
    const authHeader=req.headers.authorization;
    console.log(authHeader);
    //token mein data kiska hain padhne k liye method
    const data=jwt.decode(authHeader)
    console.log(data);
    const user =await userModel.findById(data.id);
    console.log(user);
});
app.post("/api/auth/login",async(req,res)=>
{
    const {email,password}=req.body
    const user =await userModel.findOne
    ({
        email,
    })
    const isValidPassword = await bcrypt.compare(password,user.password)
    if(!isValidPassword)
    {
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    res.status(200).json({
        message:"user logged in success",
        data:
        {
            user:{
                email:user.email,
                name:user.name,            
            }
        },
        token
    })
})
export default app;
