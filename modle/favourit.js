const mongoose = require("mongoose")
const favouritSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true
    },
    favouritId:{
        type:String,
        required:true,
        trim:true
    },
})

const Favourit= mongoose.model("Favourit",favouritSchema)

module.exports=Favourit