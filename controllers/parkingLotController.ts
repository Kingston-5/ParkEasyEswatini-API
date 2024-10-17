import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { ParkingLot } from '../models/parkingLotModel'
import dotenv from 'dotenv';

dotenv.config();

// @desc    Create New Parking Lot
// @route   POST /api/lots/create
// @access  Public
const create = asyncHandler(async (req: Request, res: Response) => {
    const { name, address, latitude, longitude, capacity, hourly_rate, image } = req.body

  if (!name ||  !address || !capacity || !hourly_rate || !image) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const lotExists = await ParkingLot.findOne({ name })

  if (lotExists) {
    res.status(400)
    throw new Error('ParkingLot already exists')
  }

  // Create parking lot
  const lot = await ParkingLot.create({
   name, 
   address, 
   capacity, 
   hourly_rate, 
   image 
  })

  if (lot) {
    res.status(201).json({
      _id: lot.id,
      name: lot.name, 
      address: lot.address, 
      capacity: lot.capacity, 
      hourly_rate: lot.hourly_rate, 
      image: lot.image
      })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// @desc    Get all parking lots
// @route   GET /api/lots/all
// @access  Private
const getAll = asyncHandler(async (req: any, res: Response) => {
  const parkingLots = await ParkingLot.find()

  res.status(200).json(parkingLots)
})


module.exports = {
  create,
  getAll,
}
