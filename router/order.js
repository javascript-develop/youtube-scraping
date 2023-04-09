const express = require('express');
const { newOrder, getAllOrders, getSingleOrder, orderDelete, orderUpdate, myOrder, discountPromoCode, paymentGetWay, paymentHendler, myCourses, allPayments, allSellesOrderList, sellersLimitDeccress, allPaymentOrderList, orderDeleteCourse, postOrder } = require('../controler/orderControler');
const router = express.Router()

router.get("/allPayments", allPayments)
router.get("/allsellesList/:id", allSellesOrderList)
router.get("/allPaymentList/:id", allPaymentOrderList)
router.post("/new", newOrder)
router.post("/post", paymentHendler)
// router.post("/post", postOrder)
router.post("/limit/:id"  , sellersLimitDeccress)
router.get("/" ,  getAllOrders)
router.get("/:id" , getSingleOrder)
router.delete("/:id" ,  orderDelete)
router.delete("/order/:id" ,  orderDeleteCourse)
router.put("/:id" , orderUpdate)
router.get("/myPayment/:email",  myOrder)
router.get("/myCourses/:email",  myCourses)
router.post("/promo" , discountPromoCode)
router.post("/create-payment-intent", paymentGetWay)






module.exports = router