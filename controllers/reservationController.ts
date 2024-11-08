import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { ParkingSpace } from "../models/parkingSpaceModel";
import { Reservation } from "../models/reservationModel";

import dotenv from "dotenv";

dotenv.config();

// @desc    create new reservation
// @route   POST /api/users
// @access  Public
export const createReservation = asyncHandler(async (req, res) => {
  try {
    const { userId, parkingSpaceId, startTime, endTime } = req.body;

    const parkingSpace = await ParkingSpace.findById(parkingSpaceId);

    if (!parkingSpace) {
       res.status(404).json({ error: 'Parking space not found' });
    }

    if (parkingSpace.state != 'available') {
       res.status(200).json({ message: 'Sorry this parking space is not available' });
    }

    const reservation = new Reservation({
      user: userId,
      parkingSpace: parkingSpaceId,
      startTime,
      endTime
    });

    await reservation.save();

    parkingSpace.state = 'reserved';
    await parkingSpace.save();

    res
      .status(201)
      .json({ message: "Reservation created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
});

export const changeReservation = asyncHandler(async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
