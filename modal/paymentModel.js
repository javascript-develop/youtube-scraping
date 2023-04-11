const mongoose = require('mongoose');

const paymentShema = new mongoose.Schema({
          productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Courses",
          },
          name: {
              type: String ,
              required: true,
            },
          email: {
              type: String ,
              required: true,
            },
           address:{
            type: String ,
            required: true,

           },
           country:{
            type: String ,
            required: true,

           },
            status:{
                  type: String ,
              default: "PAID"

            },
            paidPrice:{
                  type: Number,
              required: true,
            },

            
          createdAt: {
            type: Date,
            default: Date.now,
          },
})


const paymentModel = new mongoose.model("Payment", paymentShema)

module.exports = paymentModel