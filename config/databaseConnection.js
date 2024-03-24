const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log('connection established:',connect.connection.host, connect.connection.name)

    }catch(err){
        console.log(err)
        process.exit(1)//means if having err it will exit the process

    }
}

module.exports = connectDb
