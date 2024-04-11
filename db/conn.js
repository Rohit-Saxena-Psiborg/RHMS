const mongoose = require('mongoose')
const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports = dbConnect;