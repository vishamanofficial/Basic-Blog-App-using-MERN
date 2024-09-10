const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected`.bgGreen.white);
    }catch(error){
        console.log(`MONGO Connection Error ${error.message}`.bgRed.white);
    }
}

module.exports = connectDB;
