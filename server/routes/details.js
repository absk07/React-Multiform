const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/fileStorage');
const upload = multer({ storage });
const { details, dashboard } = require('../controllers/details');

router.post('/details', upload.array('file'), details);
router.get('/dashboard', dashboard);

module.exports = router;