import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotnev from 'dotenv';

dotnev.config()

const app = express()
const port = process.env.PORT || 8000

const corsOption = {
    origin:true
}

app.get('/', (req,res)=>{
    res.send('API is working')
})
//database connection

mongoose.set('strictQuery', false)
const connectionDB= async() => {

    try{
     await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })

     console.log('Database is connected')
    } catch(err){

        console.log('Connection error'+ err)

    }
}

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.listen(port, ()=>{

    connectionDB();
    console.log("Server is running on port: "+ port);
})