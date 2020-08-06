const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getOrders = (req, res, next) => {
    let totalItems;
    User.findOne({username: req.user.username})
    .then(user => {
        totalItems = user.orders.length;
    })
    const currentPage = parseInt(req.query.page, 10);
    const pagesize = parseInt(req.query.pagesize);
    const searchString = req.query.filter;
    const filterBy = req.query.by;
    const skip = (currentPage - 1) * pagesize;
    // Filtered user orders
    if (searchString !== undefined && searchString !== '' && searchString !== null) {
        User.findOne({username: req.user.username})
        .then(user => {
            Order.find({'creator': user._id })
            .and({ $or: [ { ['debtorDetails.' + filterBy] : { $regex: searchString, $options: 'i'} }, { ['vehicleDetails.' + filterBy] : { $regex: searchString, $options: 'i'} }, { ['orderDetails.' + filterBy] : { $regex: searchString, $options: 'i'} } ] } )
            .skip((currentPage - 1) * pagesize)
            .limit(pagesize)           
            .then(orders => {
                res.status(200).json({
                message: 'Fetched orders successfully',
                orders: orders,
                pagesize: pagesize,
                currentPage: currentPage,
                totalItems: totalItems});
            }) 
            .catch(err => {
                console.log(err);
                if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
            }); 
               
        })
    }
    // All user orders
    else {
        User.findOne({username: req.user.username})
        .then(user => {
            Order.find({'creator': user._id })
            .skip((currentPage - 1) * pagesize)
            .limit(pagesize)
            .then(orders => {        
            res.status(200).json({
            message: 'Fetched orders successfully',
            orders: orders,
            pagesize: pagesize,
            currentPage: currentPage,
            totalItems: totalItems})
            })
            .catch(err => {
                console.log(err);
                next(err);
            })  
        })
    }
};  

exports.getOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {
          res.status(200).json({
          message: 'Fetched order successfully',
          order: order,
          });
        }) 
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });   
};

exports.createOrder = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  const error = new Error('Validation failed');
  error.statusCode = 422;
  throw error;
}
    let creator;
    User.findOne({username: req.user.username})
        .then(user => {
            creator = user._id;
            const order = new Order({
                debtorDetails: {...req.body.debtorDetails},
                vehicleDetails: {...req.body.vehicleDetails},
                orderDetails: {...req.body.orderDetails},
                creator: creator
            });
            order.save()
            .then(order => {
                creator = user;
                user.orders.push(order);
                return user.save();                 
            })
            .then(result => {
            res.status(201).json({
                message: 'Order created successfully!',
                order: result,
                //   creator: { _id: creator._id, name: creator.name }
                })
            })
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        });
};

exports.updateOrder = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      throw error;
    }
    Order.findById(req.body.orderId)
        .then(order => {
            order.debtorDetails = {...req.body.debtorDetails};
            order.vehicleDetails = {...req.body.vehicleDetails};
            order.orderDetails = {...req.body.orderDetails}
            order.save()
        })
        .then(result => {
        res.status(201).json({
            message: 'Order updated successfully!',
            order: result,
            })
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        });
    };