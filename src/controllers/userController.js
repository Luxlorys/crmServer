const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const MAX_AGE = 24 * 60 * 60; // 24 hours
const signupPost = async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await userService.signup(login, password);

        res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(201).json({ user });
    } catch (error) {
        const err = errorHandler(error);
        return res.status(400).json({ err });
    }
};

const loginPost = async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await userService.signin(login, password);

        res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(200).json({ user });
    } catch (error) {
        const err = errorHandler(error);
        return res.status(400).json({ err });
    }
};

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ users });
    } catch (err) {
        const errors = errorHandler(err);
        return res.status(400).json({ errors });
    }
};

const updateUserByLogin = async (req, res) => {
    // updating by login
}

const deleteUserByLogin = async (req, res) => {
    const { login } = req.params;

    try {
        const deletedUser = await userService.deleteUserByLogin(login);

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        const err = errorHandler(error);
        return res.status(400).json({ err });
    }
}

module.exports = {
    signupPost,
    loginPost,
    logout,
    getAllUsers,
    updateUserByLogin,
    deleteUserByLogin
};
