const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyJWT');

router.use('/api', require('./auth'));

router.use('/api', verifyUser, require('./details'));

module.exports = router;