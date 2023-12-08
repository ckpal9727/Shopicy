import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

//Protect Routes
  const protect = asyncHandler(async (req, res, next) => {
    let token;

    //read JWT from the cookie
    token = req.cookies.jwt
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.userId).select('-password');
            console.log(req.user)
            next();
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error("Not authorize , token faild");
        }

    } else {
        res.status(401);
        throw new Error("Not authorize , No token");
    }
})

//Admin middleware
const admin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorizeas Admin");
    }
}

export {protect,admin}