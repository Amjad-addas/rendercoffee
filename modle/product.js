const mongoose = require("mongoose")
const Joi = require("joi")
const product = new mongoose.Schema({
    img:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        minLength:4,
        maxLength:200,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    }
})

const Product = mongoose.model("Product",product)

function addProductAuth(obj){
    const schema = Joi.object({
        img:Joi.string().required().trim(),
        name:Joi.string().min(4).max(20).trim().required(),
        description:Joi.string().min(4).max(200).trim().required(),
        price:Joi.number().min(0).required(),
    })

    return schema.validate(obj)
}
module.exports={
    Product,
    addProductAuth
}