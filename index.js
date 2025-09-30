const express = require("express")
const methodOverride = require('method-override')
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose")
const path = require('path');
const coffeepath = require("./routs/coffee")
const authpath = require("./routs/auth")

const cookieParser = require('cookie-parser');


mongoose.connect("mongodb://127.0.0.1/coffeeDB").then(
    ()=>console.log("Connction completd")
).catch(
    (err)=>console.log(`connection failed ${err}`)
)
const app= express()
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'puplic')));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(express.json())
app.use("/",coffeepath)
app.use("/auth/",authpath)


app.use((req,res,next)=>{
    const error = new Error(`not found- ${req.originalUrl}`)
    res.status(404)
    next(error)
})
app.use((err,req,res,next)=>{
    const statusCode = res.statusCode===200?500:res.statusCode
    return res.send(`${err.message}`)
})

app.listen(8000||process.env.PORT,()=>console.log(`server is running on port ${8000} `))
