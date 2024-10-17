import express from 'express'
import { protect } from '../middleware/authMiddleware';

const ParkingSpaceRouter = express.Router()

import {
  create,
  getAll,
  getOne
} from '../controllers/parkingSpaceController';

//const { protect } = require('../middleware/authMiddleware')

ParkingSpaceRouter.post('/create', protect, create)
ParkingSpaceRouter.get('/all', protect, getAll)
ParkingSpaceRouter.get('/:id', protect, getOne)

export default ParkingSpaceRouter
