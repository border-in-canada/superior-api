const express = require('express');

const dashboardController = require('../controllers/dashboard');

const router = express.Router();
router.use(express.json());

//GET /dashboard/orders
router.get('/orders', dashboardController.getOrders);

//GET /dashboard/order/orderId
router.get('/order/:orderId', dashboardController.getOrder);

//POST /dashboard/order
router.post('/order', dashboardController.createOrder);

//PUT /dashboard/order/orderId
router.put('/order/:orderId', dashboardController.updateOrder);

module.exports = router;