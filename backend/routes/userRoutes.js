import express from 'express'
const router =express.Router();
import asyncHandleer from '../middleware/asyncHandler.js'
import User from '../models/userModel.js';
import { authUser,registerUser,getUserProfile,updateUserProfile,getUsers,getUserById,updateUser,deleteUser,logoutUser } from '../controllers/userController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).post(protect,admin,updateUser)
export default router;
