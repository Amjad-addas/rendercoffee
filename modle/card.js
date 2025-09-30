const mongoose = require("mongoose")
const cardSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true
    },
    productId: [{ // قائمة من الكائنات
        name: String,
        price:Number,
        quntity:Number,
        img:String,
        _id:mongoose.Types.ObjectId
    }],
})

const Card = mongoose.model("card",cardSchema)

module.exports=Card