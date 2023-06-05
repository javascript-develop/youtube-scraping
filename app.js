const express =require("express");
const app = express();
const cors = require("cors");
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: "https://golf-b0226.web.app",
  })
);
app.use(cors());
// const cookieParser = require('cookie-parser')....
const fileUpload = require("express-fileupload");
// app.use(cookieParser())
app.use(express.json());

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

app.use(fileUpload());
app.use(express.static("public"));

// all router
const userRouter = require("./router/user");
const courseRouter = require("./router/courses");
const orderRouter = require("./router/order");
const errorHandeler = require("./utilities/errorHendeler");
const contectHandeler = require("./router/contect");
const subscribeModal = require("./modal/subscribeModal");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/contect", contectHandeler);
app.use("/", (req, res) => {
  res.send("hellw world");
});

app.use(errorHandeler);

module.exports = app;
