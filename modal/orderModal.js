const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Courses",
            // required: true,
          },
          name: {
              type: String ,
              required: true,
            },
          email: {
              type: String ,
              required: true,
            },
            limit: {
              type: Number,
              // required: true,
            },
            
            createdAt: {
            type: Date,
            default: Date.now,
          },
})


const orderModal = new mongoose.model("Order", orderShema)

module.exports = orderModal