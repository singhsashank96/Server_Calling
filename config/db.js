
const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const connection =  await mongoose.connect(process.env.DB_URL , {
          
            useUnifiedTopology : true 
           
        })
        console.log(`DB connected : ${connection.connection.host} `)
    }
    catch(error){
   console.log(error)
    }
}

module.exports = connectDB;