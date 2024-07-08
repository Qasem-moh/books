const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const {User,validateUpdateUser}=require('../models/User')

/**
 * @desc update user
 * @route /api/auth/register
 * @method PUT
 * @access private
 */
router.put("/:id",asyncHandler(async(req,res)=>{
const {error}=validateUpdateUser(req.body)
if(error){
    res.status(400).json({message:error.details[0].message})

}

if(req.body.password){
    const salt=await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
}

const updateUser= await User.findByIdAndUpdate(req.params.id,{
    $set:{
        email:req.body.email,
        password:req.body.password,
        username:req.body.username
    }
},{new:true}).select("-password")
res.status(200).json(updateUser)
}))

module.exports=router