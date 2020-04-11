const router = require('express').Router();

const {registerUser} = require('../controllers/user/createUser');
const {authUser} = require('../controllers/user/authUser');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
