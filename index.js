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

// Start the server
app.listen(port, () => {
  console.log("server is run start", port)
})