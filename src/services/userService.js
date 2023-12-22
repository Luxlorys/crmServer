const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const TOKEN = process.env.TOKEN; // secret word for token creation
const MAX_AGE = 24 * 60 * 60; // 24 hours

const createToken = (id) => {
    return jwt.sign({ id }, TOKEN, {
        expiresIn: MAX_AGE,
    });
};

const signup = async (login, password) => {
    try {
        const user = await User.create({ login, password });
        const token = createToken(user._id);
        return { user, token };
    } catch (err) {
        throw err;
    }
};

const signin = async (login, password) => {
    try {
        const user = await User.login(login, password);
        const token = createToken(user._id);
        return { user, token };
    } catch (err) {
        throw err;
    }
};

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (err) {
        throw err;
    }
};

// by login because user's login is unique
const deleteUserByLogin = async (login) => {
    try {
        const deletedUser = await User.findOneAndDelete({ login });

        if (!deletedUser) {
            throw Error('User not found')
        }

        return deletedUser;
    } catch (err) {
        throw err;
    }
}

const updateUserByLogin = async (login) => {
    try {

    } catch (err) {
        throw err;
    }
}

module.exports = {
    createToken,
    signup,
    signin,
    getAllUsers,
    deleteUserByLogin
};
