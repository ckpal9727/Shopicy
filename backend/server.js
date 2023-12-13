import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleWare.js';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orederRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//Db connection
import connectDb from './config/db.js'
connectDb();
const port =process.env.PORT
const app=express();

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//cookie parser middleware
app.use(cookieParser());



const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')));
}else{
    app.get('/',(req,res)=>{
        res.send(`Server is running..`)
    })
}

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

app.use(notFound);
app.use(errorHandler);

// app.use(express.static(path.join(__dirname,'/frontend/build')))
app.listen(port,() => console.log(`Running ${port}`))