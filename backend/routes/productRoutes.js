import express from 'express'
const router =express.Router();
import asyncHandleer from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js';
import { getProducts,getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProduct } from '../controllers/productController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.get('/top',getTopProduct);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);

export default router;
