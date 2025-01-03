import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel'
import dotenv from 'dotenv';

dotenv.config();

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { first_name, last_name, phone_number, email, password } = req.body

  if (!first_name || !last_name || !phone_number || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    first_name,
    last_name,
    phone_number,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, phone_number, password } = req.body

  // Check for user email
  const user = await User.findOne({phone_number})

if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
       _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req: any, res: Response) => {
  console.log(`=====================================\n${req}`);
  res.status(200).json({user:req.user});
})

// @desc    Update authenticated user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req: any, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the user to be updated
  if (user._id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUser)
})


// Generate JWT
const generateToken = (id: any) => {

//console.log(process.env);

  return jwt.sign({ id }, 'JWTSECRET', {
    expiresIn: '30d',
  })
}

