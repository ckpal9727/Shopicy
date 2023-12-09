import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleWare.js';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orederRoutes.js'

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

app.get('/',(req,res)=>{
    res.send(`Server is running..`)
})
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use(notFound);
app.use(errorHandler);

// app.use(express.static(path.join(__dirname,'/frontend/build')))
app.listen(port,() => console.log(`Running ${port}`))