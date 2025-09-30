const express = require("express")
const routes = express.Router()
const { addNewProduct, signInRender, signUpRender, profile, productRender, productsRender, cofffeeRender, aboutRender, home, product, addToCardRender, searchRender } = require("../controlers/coffeeControlers")


routes.get("/",home)
routes.get("/coffee",cofffeeRender)
routes.get("/about",aboutRender)
routes.get("/product/:id",product)
routes.get("/products",productsRender)
routes.get("/card",addToCardRender)
routes.get("/profile",profile)
routes.get("/signin",signInRender)
routes.get("/signup",signUpRender)
routes.get("/search",searchRender)
routes.post("/",addNewProduct)

module.exports=routes