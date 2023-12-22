const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const TOKEN = process.env.TOKEN;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check exists & valid
    if (token) {
        jwt.verify(token, TOKEN, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ message: 'you have to sing in'});
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.status(400).json({ message: 'you have to sing in'});
    }
}


// check current user
const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next()
            } else {
                console.log(decodedToken);
                res.locals.user = await User.findById(decodedToken.id);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports = { requireAuth, checkCurrentUser };