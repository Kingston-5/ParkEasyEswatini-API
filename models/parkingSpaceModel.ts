const mongoose = require('mongoose')

export const ParkingSpace = mongoose.model('ParkingSpace', 
  mongoose.Schema(
    {
      parking_lot: {
        type: String,
        required: [true, 'Please add parking lot'],
      },
      latitude: {
        type: String,
        required: [true, 'Please add latitude'],
      },
      longitude: {
        type: String,
        required: [true, 'Please add longitude'],
      },
  type: {
    type: String,
    enum: ['on-street', 'off-street', 'garage', 'valet', 'handicap', 'electric-vehicle', 'reserved'],
    required: true
  },      
  state: {
        type: String,
        enum: ['reserved', 'occupied', 'open'],
        required: true,
        },
    },
    {
      timestamps: true,
    }
  )
);
