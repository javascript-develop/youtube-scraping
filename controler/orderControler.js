const OrderDB = require("../modal/orderModal");
const Payment = require("../modal/paymentModel");
const CourseDB = require("../modal/coursesModal");
const User = require("../modal/userModal");
const stripe = require("stripe")(
  "sk_test_51L1nmNCGpaTt0RU81oq26j6Ta7gwb9pGlOOwxjeXAQgefsXMvmRxFUopKE2St6GDbDpxjUug0KxRyqzL6oKarPcR00lqLjh70r"
);
exports.newOrder = async (req, res, next) => {
  try {
 
    const { shippingInfo, orderItems } = req.body;
    console.log(req.body)
    const { quantity , id } = orderItems;
    const { name, email } = shippingInfo;

    const order = await OrderDB.create({
      productId: id,
      name,
      email,
      limit: quantity,
    });
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const order = await OrderDB.find({}).populate("user", "name email");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderDB.findById(id).populate("user", "name email");
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.orderDelete = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const order = await Payment.findById(req.params.id);
    console.log(order);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    order.remove();
    res.status(200).json({
      success: true,
      message: "Order Delete Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.orderDeleteCourse = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const order = await OrderDB.findById(req.params.id);
    console.log(order);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    order.remove();
    res.status(200).json({
      success: true,
      message: "Order Delete Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.myCourses = async (req, res, next) => {
  try {
    const email = req.params.email;

    const order = await OrderDB.find({ email: email }).populate("productId");
    console.log(order);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.discountPromoCode = async (req, res, next) => {
  try {
    const price = parseInt(req.query.totalCost);
    const promoCode = parseInt(req.query.code);
    console.log(req.query.code);
    const screctCode = ["freec"];
    const codeMatch = screctCode.includes(req.query.code);
    if (codeMatch) {
      const discountPrice = parseInt((price / 100) * 99);
      const totalPrice = price - discountPrice;
      res.status(200).json({
        success: true,
        discountPrice,
        totalPrice,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sorry We dont discount",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.orderUpdate = async (req, res, next) => {
  try {
    const order = await OrderDB.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    if (order.orderStatus === "Delivered") {
      res.status(400).json({
        success: false,
        message: "You Have All Ready Delivered This Order.",
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

async function updateStock(id, quantity) {
  try {
    const product = await CourseDB.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {}
}

exports.paymentGetWay = async (req, res, next) => {
  try {
    const service = req.body;
    const price = service.price;
    const amount = price * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecrets: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.allSellesOrderList = async (req, res, next) => {
  const salles = await OrderDB.find({ productId: req.params.id });
  console.log(salles);
  res.send({ success: true, salles });
};

exports.sellersLimitDeccress = async (req, res, next) => {
  const sellersLimmit = await OrderDB.findById(req.params.id);
  console.log(sellersLimmit);
  if (sellersLimmit.limit > 0) {
    sellersLimmit.limit = sellersLimmit.limit - 1;
    sellersLimmit.save();
    res.send({ success: true, message: "Limit Reduce Succssfull" });
  } else {
    res.send({ success: false, message: "All Limit Allready Reduce" });
  }
  console.log(sellersLimmit);
};

// payment router
exports.paymentHendler = async (req, res, next) => {
  try {
   
    const {
      orderItems,
      shippingInfo,
      // name,
      // email,
      // address,
      // country,,
      paidPrice,
      emails,
    } = req.body;
    const { id } = orderItems;
    const { name, email, address, country } = shippingInfo;

    console.log(emails);
    const order = await Payment.create({
      productId: id,
      name,
      email,
      address,
      country,
      paidPrice,
    });
    const makeAdmin = await User.updateOne(
      { _id: emails },
      {
        $set: { status: "PAID" },
      }
    );
    console.log(req.body);
    if (makeAdmin.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        order,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.myOrder = async (req, res, next) => {
  try {
    const email = req.params.email;
    const order = await Payment.findOne({ email: email });
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.allPayments = async (req, res, next) => {
  try {
    const order = await Payment.find({});
    res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.allPaymentOrderList = async (req, res, next) => {
  const salles = await Payment.find({ productId: req.params.id });
  console.log(salles);
  res.send({ success: true, salles });
};
