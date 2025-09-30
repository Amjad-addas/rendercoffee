const mongoose = require("mongoose")
const Joi = require("joi")
const user  = mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:200,
        trim:true
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:200,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    userName:{
        type:String,
        minlength:2,
        maxlength:200,
        trim:true
    },  
    password:{
        type:String,
        minlength:3,
        maxlength:200,
        trim:true
    },  
    
})

const User = mongoose.model("User",user)


function addUserAuth(obj){
    const userSchema=Joi.object({
        firstName:Joi.string().min(3).max(200).required().trim(),
        lastName:Joi.string().min(3).max(200).required().trim(),
        email:Joi.string().email().min(3).max(200).required().trim(),
        userName:Joi.string().min(2).max(200).required().trim(),
        password:Joi.string().min(3).max(200).required().trim()
    })
    return userSchema.validate(obj)
}

function updateUserAuth(obj){
    const userSchema=Joi.object({
        firstName:Joi.string().min(3).max(200).trim(),
        lastName:Joi.string().min(3).max(200).trim(),
        email:Joi.string().email().min(3).max(200).trim(),
        userName:Joi.string().min(2).max(200).trim(),
        password:Joi.string().min(3).max(200).trim()
    })
    return userSchema.validate(obj)
}

function signInAuth(obj){
    const userSchema=Joi.object({
        email:Joi.string().email().min(2).max(200).required().trim(),
        password:Joi.string().min(3).max(100).required().trim()
    })
    return userSchema.validate(obj)
}


module.exports={
    User,addUserAuth,updateUserAuth,signInAuth
}