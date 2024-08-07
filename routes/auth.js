const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const { User, validateRegisterUser, validateLoginUser } = require('../models/User')
/**
 * @desc Register new user
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/register', asyncHandler(async (req, res) => {

    const { error } = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })

    }
    let user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).json({ message: "this user already in database" })
    }
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    const result = await user.save()
    const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)
    const { password, ...other } = result._doc
    res.status(201).json({...other, token})
}))



/**
 * @desc login user
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/login', asyncHandler(async (req, res) => {

    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })

    }
    let user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ message: "invalid email or password" })
    }
   
    const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
   
    if(!isPasswordMatch){
        return res.status(400).json({message:"invalid email or password"})
    }
    const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},"secretkey")
    const { password, ...other } = user._doc
    res.status(200).json({...other, token})
}))















// /**
//  * @desc get all user 
//  * @route api/auth/
//  * @methos GET
//  * @status public
//  */

// router.get("/", asyncHandler(async (req, res) => {
//     const user = await User.find()
//     if (user) {
//         res.status(200).json(user)
//     } else {
//         res
//     }
// }))


module.exports = router