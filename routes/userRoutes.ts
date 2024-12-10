import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateUser
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const UserRouter = express.Router()

UserRouter.post('/', registerUser)
UserRouter.post('/login', loginUser)
UserRouter.get('/me', protect, getMe)
UserRouter.put('/:id', protect, updateUser)

export default UserRouter
