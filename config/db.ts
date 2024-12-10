import mongoose from 'mongoose'
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`)

    console.log(colors.cyan(`MongoDB Connected: ${conn.connection.host}`).underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}


