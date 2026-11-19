import express from 'express'
const app=express();
app.use(express.json());

app.get("/api",(req,res)=>
{
    res.status(200).json({
        message:"Welcome to the authentication API"
    })
})

app.post("api/register",(req,res)=>
{
    const {email,name,password}=req.body;
   
})
export default app;