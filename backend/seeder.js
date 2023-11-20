import mongoose from "mongoose";
import dotenv from 'dotenv';

import user from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createUsers = await User.insertMany(user);         //Creating multiple user
        const adminUser = createUsers[0]._id;                    //Assingning admin user

        const sampleProduct = products.map((product) => {
            return { ...product, user: adminUser }
        })                                                      //inserting admin user in products

        await Product.insertMany(sampleProduct);                //inserting products

        console.log("Data inserted successfully");
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

const destroyData = async () => {
   try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data deleted succesfully")
   } catch (error) {
    console.log(error)
   }
}

if(process.argv[2]=='-d'){
    destroyData();
}else{
    importData();
}