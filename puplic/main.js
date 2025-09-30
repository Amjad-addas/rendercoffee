

const screenWidth = screen.width;
document.getElementById("lines").addEventListener("click",function(e){

    let isOpen= document.getElementById("links").classList.contains("active")

    if(!isOpen){
    document.getElementById("links").classList.add("active")  
    document.getElementById("links").style.flexDirection="column"
    document.getElementById("header").style.flexDirection="column"
    document.getElementById("header").style.flexDirection="links"
    document.getElementById("ul").style.flexDirection="column"
    document.getElementById("ul").style.marginBottom="12px"
    document.getElementById("header").style.alignItems="start"
    
    }else{
        document.getElementById("links").classList.remove("active") 
    }
        
})
document.getElementById("joinus").addEventListener("click",function(e){
    console.log(screenWidth)
    let isOpen= document.getElementById("joinlinks").classList.contains("active")
    
    if(!isOpen){
            if(screenWidth<992){
        console.log("Dasdasda")
    
    document.getElementById("joinlinks").style.position="static"}
    document.getElementById("joinlinks").classList.add("active")  

    
    }else{
        document.getElementById("joinlinks").classList.remove("active") 
    }

})
document.getElementById("joinus2").addEventListener("click",function(e){
    let isOpen= document.getElementById("joinlinks2").classList.contains("active")
    
    if(!isOpen){
            if(screenWidth<992){
        console.log("Dasdasda")
    
    document.getElementById("joinlinks2").style.position="static"}
    document.getElementById("joinlinks2").classList.add("active")  

    
    }else{
        document.getElementById("joinlinks2").classList.remove("active") 
    }
})

function getCookie(name) {
    try {
        // تقسيم جميع الكوكيز إلى مصفوفة
        const cookieArray = document.cookie.split(';');
        
        // البحث عن الكوكي المطلوب
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            
            // التحقق إذا كان هذا الكوكي المطلوب
            if (cookie.startsWith(name + '=')) {
                // استخراج القيمة وفك التشفير
                const cookieValue = cookie.substring(name.length + 1);
                return decodeURIComponent(cookieValue);
            }
        }
        
        return null; // إذا لم يتم العثور
    } catch (error) {
        console.error('Error reading cookie:', error);
        return null;
    }
}
function add(){
    let key=0
    let proname=document.getElementById("proname").innerText

    let proprice=document.getElementById("proprice").innerText
     proprice=proprice[0]+proprice[1]
    let list =getCookie("list")
    console.log(list);
    if(list){

        list  =  JSON.parse(list)
        
        list.forEach(element => {
            if(element.name==proname){
                key =1
                element.quantity=element.quantity+1
                
               
            }
            
            document.cookie=`list=${JSON.stringify(list)}`
            
            });
if(key!=1){
            const object= { name: proname, peice:proprice ,quantity:1}
            list.push(object)
        const jsonStr= JSON.stringify(list)
        
        document.cookie=`list=${jsonStr}`
}
    }else{
       const object= { name: proname, peice:proprice,quantity:1}
        const obj =[ ];
        obj.push(object)
        const jsonStr = JSON.stringify(obj);

        console.log(jsonStr);
        document.cookie=`list=${jsonStr}`
}

}

function remove(){
    document.cookie="store=amjad"
}