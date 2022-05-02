const e = require('express');
const { User } = require('./models');
const jwt = require('jsonwebtoken');

// This function checks if requests are comming from
// a real user 
exports.checkPassenger = async (req, res, next) => {
    try{
        const token = req.headers["auth-token"];
        const decodedToken = jwt.decode(token, 'skdnvkdsjnvsdkjn');
        const user = await User.findById(decodedToken._id);
        if (decodedToken._id === req.body.passenger || user.role === "passenger"){
            next();
        }
        else {
            return res.json({status: 400, message: "You have to be a passenger to perform this operation"});
        }
    } catch(err){
        return res.json({status: 401, message: "Something went wrong, please try again later"}); 
    }
}

exports.checkDriver = async (req, res, next) => {
    try{
        const token = req.headers["auth-token"];
        const decodedToken = jwt.decode(token, 'skdnvkdsjnvsdkjn');
        const user = await User.findById(decodedToken._id);
        if (user.role === "Driver"){
            next();
        }
        else {
            return res.json({status: 400, message: "You have to be a driver to perform this operation"});
        }
    } catch(err){
        return res.json({status: 401, message: "Something went wrong, please try again later"}); 
    }

}


