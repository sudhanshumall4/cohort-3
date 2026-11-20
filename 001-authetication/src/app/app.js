import express from 'express'
const app=express();
import jwt from "jsonwebtoken"
import userModel from '../models/user.models.js';
app.use(express.json());

app.get("/api",(req,res)=>
{
    res.status(200).json({
        message:"Welcome to the authentication API"
    })
})

app.post("/api/auth/register",async(req,res)=>
{
    const {email,name,password}=req.body;
    const user=await userModel.create({
        email,
        name,
        password
    });
    const token=jwt.sign(
        {
               id:user._id
        }, 
    "XfKPfQZXnOnwiZgXarHCtigl8kqGyMd3vj45ESCT0bn"//jwt secret
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


app.get("/api/auth/me",async(req,res)=>
{
    const authHeader=req.headers.authorization;
    console.log(authHeader);
})
export default app;