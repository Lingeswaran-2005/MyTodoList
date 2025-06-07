const mongoose= require("mongoose")

const getConnection = async () =>{
    try{
        mongoose.connect("mongodb://localhost:27017/")
        console.log("success")
    }
    catch(error){
        console.error(error);
        process.exit(1)
    }
    
}

module.exports=getConnection