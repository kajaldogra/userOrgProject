import mongoose from "mongoose";

const connectDB = async(req,res)=>{
    try{
        const DATABASE_URL = process.env.DATABASE_URL
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(error)
    }
};

export default connectDB