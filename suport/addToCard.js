const Card = require("../modle/card");

const addToCards=async(list,req,id ,op,res)=>{
        let key=0
        if(list){

        
        
        list.productId.forEach(async element => {
            console.log(element.name)
            if(element.name==req.name || op=='add'){
     
                key =1
                element.quntity=element.quntity+1
                
                await Card.updateOne(
                { userId:id, },
                { $set: { productId:list.productId } }

            );

            }
            else if(element.name==req.name || op=='min'){
                key =1
                if(element.quntity!=1){
                element.quntity=element.quntity-1
                }
                await Card.updateOne(
                { userId:id, },
                { $set: { productId:list.productId } }

            );
            }
            else if(element.name==req.name|| op=="remove"){
                key =1
                const filteredItems = list.productId.filter(item => item.name !== req.name);
                
                await Card.updateOne(
                { userId:id, },
                { $set: { productId:filteredItems } }

            );
            }


            
                });
            if(key!=1){
                
            const object= { name: req.name, price:req.price ,quntity:1,img:req.img,_id:req._id}
            list.productId.push(object)
       
        
            await Card.updateOne(
                { userId:id, },
                { $set: { productId:list.productId } }
            );
                    }
        }else{
            
       const object= { name: req.name, price:req.price,quntity:1,img:req.img,_id:req._id}
        const obj =[ ];
        obj.push(object)
        

            const card= Card(
                { userId:id,
                 productId:object  }
            );
            await card.save()
                    }
}


module.exports=addToCards