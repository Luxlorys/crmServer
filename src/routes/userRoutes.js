const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();


router.post('/signup', userController.signupPost);
router.post('/login', userController.loginPost);


router.get('/logout', userController.logout);
router.get('/api/users', userController.getAllUsers)

router.delete('/api/delete/:login', userController.deleteUserByLogin);
router.put('/api/update/:login', userController.updateUserByLogin);

module.exports = router;