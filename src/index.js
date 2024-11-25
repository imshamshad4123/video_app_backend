import express from "express";
// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})

connectDB();











/*   below code is using IIFs
const app =express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

        app.on("error",(error)=>{console.log("Error: ", error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port: ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log(error)
        throw error
    }
})()


*/