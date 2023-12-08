import user from "../data/users.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from "../utils/genrateToken.js";

//@desc auth user and get token

const authUser = asyncHandler((async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid user name or password');
    }

}))

const registerUser = asyncHandler((async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        res.status(400);
        throw new Error("User already exist");
    }
    const user = await User.create({ name, email, password });
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error("wrong user data");
    }
    res.send('register user');
}))

//logoutUser/clear cookie
const logoutUser = asyncHandler((async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout successfully' })
}))
const getUserProfile = asyncHandler((async (req, res) => {
    console.log("called get user profile")
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error(" user data not found");
    }
}))
const updateUserProfile = asyncHandler((async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email

        if(req.body.password){
            user.password=req.body.password;
        }

        const updateUser= await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })

    } else {
        res.status(400);
        throw new Error(" user data not found");
    }
}))
const getUsers = asyncHandler((async (req, res) => {
    const users = await User.find();
    res.json({ users: users })
}))
const deleteUser = asyncHandler((async (req, res) => {
    res.send('delete user');
}))
const getUserById = asyncHandler((async (req, res) => {
    res.send('user by id');
}))
const updateUser = asyncHandler((async (req, res) => {
    
    res.json({message:"user Update by id Admin"});
}))

export {
    authUser, registerUser, updateUserProfile, getUsers, getUserById, updateUser, deleteUser, logoutUser, getUserProfile
}