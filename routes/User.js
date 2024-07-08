const express=require('express')
const router=express.Router()
const asyncHandler = require("express-async-handler")
const {User}=require("../models/User")

router.get('/',asyncHandler(async (req, res) => {
    const data=await User.find()
    res.status(200).json(data)
}))

module.exports = router