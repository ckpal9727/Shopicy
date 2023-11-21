import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound,errorHandler } from './middleware/errorMiddleWare.js';

import productRoutes from './routes/productRoutes.js'
import connectDb from './config/db.js'
connectDb();
const port =process.env.PORT
const app=express();


app.get('/',(req,res)=>{
    res.send(`Server is running..`)
})
app.use('/api/products',productRoutes);
app.use(notFound);
app.use(errorHandler);

// app.use(express.static(path.join(__dirname,'/frontend/build')))
app.listen(port,() => console.log(`Running ${port}`))