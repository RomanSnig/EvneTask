const router = require('express').Router();

const {findByQuantityNum, getAll} = require('../controllers/exchangeRate');

router.get('/currency/:currency', findByQuantityNum);
router.get('/currencies', getAll);

module.exports = router;
