const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');


exports.root = (req, res, next) => {
    res.status(200).json({message: 'API Connection Successful'});
    next();
}

exports.getUser = (req, res, next) => {
    const tokens = JSON.stringify(req.body.credentials.accessToken);
    const awsUser = req.body.user.userName;
    const userEmail = req.body.user.email;
    let loadedUser;
    User.findOne({username: awsUser})
        .then(user => {
            if (!user) {
                const username = awsUser;
                const user = new User({
                    username: username,
                    email: userEmail
                });
                return user.save()
                .then(result => {
                    res.cookie('supAuth', tokens, { maxAge:3500000, httpOnly: true });
                    res.status(200).json({message: 'User created', userId: result._id.toString(), userEmail: result.email.toString()});
                })
                .catch(err => {
                    res.status(500).json({message: 'User save failed'});
                    next(err);     
                });         
            }
            else {
                loadedUser = user;
                res.cookie('supAuth', tokens, { maxAge:3500000, httpOnly: true });
                res.status(200).json({userId: loadedUser._id.toString(), userEmail: loadedUser.email.toString()});            
            } 
        })
        .catch(err => {
            if (!err.statusCode) {
                console.log(err);
                err.statusCode = 500;
            }
            next(err);     
        })
}

exports.logoutUser = (req, res, next) => {
    res.clearCookie('supAuth');
    res.status(200).json({message: 'Cookie Cleared'});
    
}