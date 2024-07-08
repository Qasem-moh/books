const Joi = require("joi")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5,
        trim: true,
        unique:true,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    
    },
   
    password: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5,
        trim: true,
    
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

//validate Register User
function validateRegisterUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        username:Joi.string().trim().min(2).max(200).required(),
        password:Joi.string().trim().min(6).required(),
        isAdmin:Joi.bool(),
    })
    return schema.validate(obj)
}
//validate login User
function validateLoginUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}
//validate update User
function validateUpdateUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        username:Joi.string().trim().min(2).max(200),
        password:Joi.string().trim().min(6),
        isAdmin:Joi.bool(),
    })
    return schema.validate(obj)
}


module.exports = {
User,
validateRegisterUser,
validateLoginUser,
validateUpdateUser
}