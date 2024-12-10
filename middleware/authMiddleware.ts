import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel'

export const protect = asyncHandler(async (req:any , res:any, next:any) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
console.log('token:=> ', token);
      // Verify token
      if (process.env.JWT_SECRET) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get user from the token
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
  const userId = decoded.id as string; // Cast if it's an object with 'id'
  req.user = await User.findById(userId).select('-password');
} else {
  // Handle case where decoded doesn't have an 'id' property (e.g., log an error)
  console.error("Missing 'id' property in decoded JWT payload.");
}
 //       req.user = await User.findById(decoded.id).select('-password')
        } else {
        throw new Error('JWT Missing');
        }
           next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
