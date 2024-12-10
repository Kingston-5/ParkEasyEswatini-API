import express from 'express'
import { protect } from '../middleware/authMiddleware';
const ParkingLotRouter = express.Router()

const {
  create,
  getAll
} = require('../controllers/parkingLotController')
//const { protect } = require('../middleware/authMiddleware')

ParkingLotRouter.post('/create',  create)
ParkingLotRouter.get('/all',  getAll)

export default ParkingLotRouter
