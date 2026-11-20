import express from 'express'
const app=express();
import jwt from "jsonwebtoken"
app.use(express.json());

app.get("/api",(req,res)=>
{
    res.status(200).json({
        message:"Welcome to the authentication API"
    })
})

app.post("/api/auth/register",(req,res)=>
{
    const {email,name,password}=req.body;
    const token=jwt.sign(
        {

    },
    "XfKPfQZXnOnwiZgXarHCtigl8kqGyMd3vj45ESCT0bn"//jwt secret
    )
    res.status(201).json({
        message:"user created successfully",
        data:{
            user:{
                email,name
            },
            token
        }
    })
});
export default app;