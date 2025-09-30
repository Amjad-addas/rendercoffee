const Favourit = require("../modle/favourit")
const decode = require("./decodJWT")

const isFav=async(req)=>{
    let isfav=0
    if(req.cookies.id==undefined){
        return isfav = 0
    }
    const userId=decode(req.cookies.id)
    
    const productId=req.params.id
        const fav = await Favourit.find({
        userId:userId,
        favouritId:productId
    })
    if(fav[0]){
        isfav=1
    }
    return isfav
}

module.exports=isFav