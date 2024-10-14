import express, { urlencoded } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import messageRoute from './routes/message.route.js'
import {app , server} from './socket/socket.js'; 
import path from "path";

dotenv.config({});
// const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

//route
app.get("/" , (_,res)=>{
  return res.status(200).json({message : "I'm coming  from backend",success : true})      
})

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(urlencoded({extends:true}))
// const corsOptions = {
//     origin : "http://localhost:5173",  
//     methods: ["GET", "POST","DELETE"],
//     credentials : true   
// }
// app.use(cors(corsOptions));
app.use(cors())

// routes
app.use("/api/v1/user",userRoute);// http://localhost:8000/api/v1/user
app.use("/api/v1/post",postRoute);// http://localhost:8000/api/v1/post
app.use("/api/v1/message",messageRoute);// http://localhost:8000/api/v1/message

app.use(express.static(path.join(__dirname,"/frontend/dist")));


server.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at post ${PORT}`);   
})

