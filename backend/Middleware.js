const e = require('express');
const { User } = require('./models');
const jwt = require('jsonwebtoken');

exports.checkPassenger = async (req, res, next) => {
    try{
        // validating user
        const token = req.headers["auth-token"];
        // console.log(token);
        const decodedToken = jwt.decode(token, 'skdnvkdsjnvsdkjn');
        const user = await User.findById(decodedToken._id);
        if (decodedToken._id === req.body.passenger ||
            user)
        {
            next();
        }
        else{
            return res.json({
                status: 400,
                message: "Unauthorized attempt",
            });
        }
    }
    catch(err)
    {
        return res.json({
            status: 401,
            message: "Something went wrong, please try again later",
        });
    }

}


