import express from 'express'
import { protect } from '../middleware/authMiddleware';

const ParkingSpaceRouter = express.Router()

import {
  create,
  getAll,
  getOne
} from '../controllers/parkingSpaceController';

//const { protect } = require('../middleware/authMiddleware')

ParkingSpaceRouter.post('/create', create)
ParkingSpaceRouter.get('/all', getAll)
ParkingSpaceRouter.get('/:id', getOne)

export default ParkingSpaceRouter
