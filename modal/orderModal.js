const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
      // shippingInfo: {
      //       // name: {
      //       //   type: String,
      //       //   required: true,
      //       // },
      //       address: {
      //         type: String,
      //         required: true,
      //       },
      //       city: {
      //         type: String,
      //         required: true,
      //       },
        
      //       email: {
      //         type: String,
      //         required: true,
      //       },
        
      //       country: {
      //         type: String,
      //         required: true,
      //       },
      //       pinCode: {
      //         type: Number || String,
      //         required: true,
      //       },
      //       phoneNo: {
      //         type: Number || String,
      //         required: true,
      //       },
      //     },
          // orderItems: [
          //   {
          //     name: {
          //       type: String,
          //       required: true,
          //     },
          //     price: {
          //       type: Number,
          //       required: true,
          //     },
          //     quantity: {
          //       type: Number,
          //       required: true,
          //     },
          //     totalPrice: {
          //       type: Number,
          //       required: true,
          //     },
          //     image: {
          //       type: String,
          //       required: true,
          //     },
          //     product: {
          //       type: mongoose.Schema.ObjectId,
          //       ref: "Courses",
          //       required: true,
          //     },
          //   },
          // ],
          productId: {
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
          
          // paidAt: {
          //   type: String,
          //   required: true,
          // },
      //     subTotalPrice: {
      //       type: Number,
      //       required: true,
      //       default: 0,
      //     },
      //     discount: {
      //       type: Number,
      //       required: true,
      //       default: 0,
      //     },
      // //     shippingPrice: {
      // //       type: Number,
      // //       required: true,
      // //       default: 0,
      // //     },
      //     totalPrice: {
      //       type: Number,
      //       required: true,
      //       default: 0,
      //     },
      //     orderStatus: {
      //       type: String,
      //       required: true,
      //       default: "Processing",
      //     },
          // deliveredAt: Date,
          createdAt: {
            type: Date,
            default: Date.now,
          },
})


const orderModal = new mongoose.model("Order", orderShema)

module.exports = orderModal