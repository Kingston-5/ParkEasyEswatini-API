const mongoose = require('mongoose')

export const User = mongoose.model('User', 
  mongoose.Schema(
    {
      first_name: {
        type: String,
        required: [true, 'Please add first name'],
      },
      last_name: {
        type: String,
        required: [true, 'Please add a last name'],
      },  
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
      },
      phone_number: {
        type: String,
        required: [true, 'Please add a phone_number'],
        unique: true,
      },
       password: {
        type: String,
        required: [true, 'Please add a password'],
      },
    },
    {
      timestamps: true,
    }
  )
);


