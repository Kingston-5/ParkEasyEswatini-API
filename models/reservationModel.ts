const mongoose = require("mongoose");

export const Reservation = mongoose.model(
  "Reservation",
  mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
      },
      parkingSpace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParkingSpace",
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  )
);
