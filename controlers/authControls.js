const Card = require("../modle/card")
const Favourit = require("../modle/favourit")
const { User, addUserAuth, signInAuth,updateUserAuth } = require("../modle/user")
const addCookis = require("../suport/addCookie")
const findUser = require("../suport/findUser")
const addToCards =require("../suport/addToCard")
const { Product } = require("../modle/product")
const jwt = require('jsonwebtoken');
const decode = require("../suport/decodJWT")
const {hashPassword, isPassword} = require("../suport/hashpassword")
const signUp= async(req,res)=>{ 
    const{error}= addUserAuth(req.body)
    if(error){
        return res.send(`error ${error.message}`)
    }
    const email = await User.findOne(
        {email:req.body.email}

    )
    if(email){
        return res.send("the email is already register")
    }
    
    const user = new User(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:await hashPassword(req.body.password),
            email:req.body.email,
            userName:req.body.userName
        }
    )
    await user.save()
        const token = jwt.sign({email:req.body.email},"0988599231")

    addCookis("id",res,token)
    return res.redirect("/")
}

const signIn=async(req,res)=>{
    console.log(req.cookies.id)
    const {error} =signInAuth(req.body)
    if(error){
        return res.send(`error ${error.message}`)
    }
    const users =await User.findOne(
        {email:req.body.email}
    )
        if(!users){
           return res.send("passwor or user name is wrong");
        }
        
        if(await isPassword( req.body.password,users.password)==false){
            return res.send("passwor or user name is wrong");
        }
        addCookis("id",res,jwt.sign({email:req.body.email},"0988599231"))
        return res.redirect("/")
        
    
}
const updateUser =async(req,res)=>{
    const {error}=updateUserAuth(req.body)
    if(error){
        return res.send(`Error ${error.message}`)
    }
    if(decode(req.cookies.id)!=req.body.email){
        return res.send("invalide token")
    }
    await User.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true}
    )
    return res.redirect("/profile")
}
const addToFavourit=async(req,res)=>{
            if(req.cookies.id==undefined){

            return res.send("you are not register")
        }
    if(req.cookies.id){
        const fav =new Favourit({
            userId:decode(req.cookies.id),
            favouritId:req.params.id
        })
        await fav.save()
       return res.redirect(`/product/${req.params.id}`)
    }
    
}

const deletFromFavourit=async(req,res)=>{
            if(req.cookies.id==undefined){

            return res.send("you are not register")
        }
      const userId=decode(req.cookies.id)

    const fav = await Favourit.find({
        userId:userId,
        favouritId:req.params.id
    })
    await Favourit.findByIdAndDelete(fav[0]._id)


    return res.redirect(`/product/${req.params.id}`)
}

const addToCard=async(req,res)=>{
            if(req.cookies.id==undefined){

            return res.send("you are not register")
        }
    const product=await Product.findById(req.params.id)
    const id =decode(req.cookies.id)
    const card = await  Card.find(
        {userId:id}
    )


    let list =card[0]
    addToCards(list,product,id,req.query.op)
    if(req.query.op=="add"||req.query.op=="min"||req.query.op=="remove"){
        res.redirect("/card")
    }
    res.redirect(`/product/${req.params.id}`)
}

module.exports={
    signIn,signUp,addToFavourit,deletFromFavourit,addToCard,updateUser
}