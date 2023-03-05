const app = require('./app')
const database = require('./database/database')

const cloudinary = require('cloudinary').v2
require('dotenv').config()
const paypal = require('paypal-rest-sdk');
const port = process.env.PORT || 5000

// server configurations

database()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVtywy4P1cuBKBUJLizfmYe86U_TukffZg1GsiojtPFPhyGrkhcU8tKC11-k4NeIaqxXSqs8yXmgYnio',
  'client_secret': 'EMUKO8K2HFgc8Ay7bnHOlm8n5IK66nDOboVXXlTdU9i7jAFO8mOdwD4jfwNyDYUq2akBSDXxHYHkCmg2'
});

// Start the server
app.listen(port, () => {
  console.log("server is run start", port)
})