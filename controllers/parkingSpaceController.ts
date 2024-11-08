import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { ParkingSpace } from '../models/parkingSpaceModel'
import dotenv from 'dotenv';

dotenv.config();

// @desc    Create New Parking space
// @route   POST /api/space/create
// @access  Public
export const create = asyncHandler(async (req: Request, res: Response) => {
    const { parkingLot, latitude, longitude, type, state} = req.body

  if (!parkingLot || !latitude || !longitude || !type || !state) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const spaceExists = await ParkingSpace.findOne({ latitude, longitude })

  if (spaceExists) {
    res.status(400)
    throw new Error('Parking space already exists')
  }

  // Create parking lot
  const space = await ParkingSpace.create({
  parkingLot,
  latitude,
  longitude,
  type,
  state
  })

  if (space) {
    res.status(201).json({
      _id: space.id,
      parkingLot: space.parkingLot,
      latitude: space.latitude,
      longitude: space.longitude,
      type: space.type,
      state: space.state
      })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})



// @desc    Get all parking spaces
// @route   GET /api/spaces/all
// @access  Private
export const getAll = asyncHandler(async (req: any, res: Response) => {
  const parkingSpaces = await ParkingSpace.find()

  res.status(200).json(parkingSpaces)
})

// @desc    Get One parking space
// @route   GET /api/spaces/:id
// @access  Private
export const getOne = asyncHandler(async (req: any, res: Response) => {
  const space = await ParkingSpace.findById(req.params.id)

  if (!space) {
    res.status(400)
    throw new Error('Parking space not found')
  }

  res.status(200).json(space)
})

