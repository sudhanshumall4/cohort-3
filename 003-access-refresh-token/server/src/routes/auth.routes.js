import {Router} from "express";
import userModel from '../models/user.models.js'
import bcrypt from 'bcrypt';
import { generateTokens,verifyAccessToken,verifyRefreshToken} from "../utils/auth.js";
const router=Router();

router.post('/register',async(req,res)=>
{
    const {name,email,password}=req.body;
    const isUserExists=await userModel.findOne({email})
    if(isUserExists)
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


const{accessToken,refreshToken}=generateTokens({userId:user._id})
user.refreshToken=refreshToken
await user.save();


res.cookie("refreshToken",refreshToken,{
    httpOnly:true,    //sirf server hi cookie ko read kr skta hain need to set
})
res.status(201).json({
    message:"user registered successfully",
    data:
    {
        user:{
            name:user.name,
            email:user.email
        }
    },
    accessToken
});
});
router.get('/me',async(req,res)=>
{
    const accessToken=req.headers.authorization?.split(" ")[1] // split kiya hain kyunki do parts hote hain and array mein do part hota hai 1par token rehta hain
    try
    {
        const decoded =verifyAccessToken(accessToken);
        const user=await userModel.findById(decoded.id);
        res.status(200).json({
            message:"user fetched successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email
                }
            }
        })

    }
    catch(err)
    {
         console.log(err.message);
          return res.status(400).json({
            message:"Unauthorized,Invalid or expired access token",
          })
    }

})

router.post("/refresh",async(req,res)=>
{
    const refreshToken=req.cookies.refreshToken

    if(!refreshToken)
    {
        return res.status(401).json({
            message:"Unauthorized,refrsh token not found",
        })
    }
    try
    {
     const decoded=await verifyRefreshToken(refreshToken);
     const user=await userModel.findById(decoded.id)
     if(refreshToken!== user.refreshToken)
     {
        user.refreshToken=null
        await user.save()

        return res.status(401).json({
            message:"Unauthorized,refresh token mismatch",
        })
     }
     const {accessToken,refreshToken:newRefreshToken}=generateTokens({userId:user._id})
     res.cookie("refreshToken",newRefreshToken,{httpOnly:true})
     
     user.refreshToken=newRefreshToken
     await user.save();
     res.status(200).json({
        message:"Tokens refreshed successfully",
        accessToken
     })
    }
    catch(err)
    {
         
       return res.status(401).json({
        message:"Unauthorized,Invalid or expires refresh token"
       })
    } 
})
export default router;