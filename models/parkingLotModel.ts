const mongoose = require('mongoose')

export const ParkingLot = mongoose.model('ParkingLot', 
  mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please add  name'],
      },
      address: {
        type: String,
        required: [true, 'Please add an address'],
      },  
      latitude: {
        type: String,
        required: [true, 'Please add latitude'],
      },
      longitude: {
        type: String,
        required: [true, 'Please add longitude'],
      },
       capacity: {
        type: String,
        required: [true, 'Please add capacity'],
      },
       hourly_rate: {
        type: String,
        required: [true, 'Please add hourly rate'],
        },
        image : {
          type: String,
          image: [true, 'PLease add image'],
          },
    },
    {
      timestamps: true,
    }
  )
);
