const Card = require("../modle/card")
const Favourit = require("../modle/favourit")
const { Product, addProductAuth } = require("../modle/product")
const { User } = require("../modle/user")
const decode = require("../suport/decodJWT")
const isFav = require("../suport/findFav")
var jwt = require('jsonwebtoken');
const home=async(req,res)=>{
    try {
            const products = await Product.find()
    return res.render("index.ejs",{products:products})
    } catch (error) {
        console.log(error)
    }

}

const addNewProduct=async(req,res)=>{
    const {error} = addProductAuth(req.bod)
    if(error){
        res.status(400).json({message:error.message})
    }
    try {
        const product = new Product(
            {
                img:req.body.img,
                name:req.body.name,
                description:req.body.description,
                price:req.body.price
            }
        )
        await product.save()
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
}}

const signInRender=async(req,res)=>{
        const products = await Product.find()
        return res.render("signin.ejs",{products:products})
}
const signUpRender=async(req,res)=>{
    const products = await Product.find()
    return res.render("signup.ejs",{products:products})
}
const profile=async(req,res)=>{
        
        if(req.cookies.id==undefined){

            return res.send("you are not register")
        }
        const user = await User.find(
            {email:decode(req.cookies.id)}
        )
        
        const products = await Product.find()
    return res.render("profile.ejs",{products:products,user:user[0]})
}
const product=async(req,res)=>{
    const products = await Product.find()
    const product = await Product.findById(req.params.id)
    const isfav=await isFav(req)
    return res.render("product.ejs",{product:product,isfav:isfav,products:products})
}
const productsRender=async(req,res)=>{
        const products = await Product.find()
    return res.render("products.ejs",{products:products})
}
const aboutRender=async(req,res)=>{
        const products = await Product.find()
    return res.render("about.ejs",{products:products})
}
const cofffeeRender=async(req,res)=>{
        const products = await Product.find()
    return res.render("coffee.ejs",{products:products})
}
const addToCardRender =async(req,res)=>{
    if(req.cookies.id==undefined){
        return res.send("you are not register")
    }
        const products = await Product.find()
    const id = decode(req.cookies.id)
    const cardForUser = await Card.find(
        {userId:id}
    )
    if(cardForUser.length==0){
        return res.render("card.ejs",{product:{},price:0,products:products},)
 
    }

    price=0
    cardForUser[0].productId.forEach(element => {
        price=price+Number(element.price)*Number(element.quntity)
    });

    return res.render("card.ejs",{product:cardForUser[0].productId,price:price,products:products},)
}
const searchRender = async(req,res)=>{
    let isfav =0
const userId=decode(req.cookies.id)
        const products=await Product.find()
      const results = products.filter(item =>
        item.name.includes(req.query.name)||
        item.name.startsWith(req.query.name)||
         item.name.toLowerCase().includes(req.query.name.toLowerCase())
    
    )
        const fav = await Favourit.find({
        userId:userId,
        favouritId:results[0]._id
    })
    if(fav[0]){
        isfav=1
    }

        return res.render("product.ejs",{products:products,product:results[0],isfav:isfav})
}
module.exports={
    addNewProduct,signInRender,signUpRender,profile,productsRender,cofffeeRender
    ,aboutRender,home,product,addToCardRender,searchRender
}