const express = require("express");
const user = require('./user');
const doctor = require('./doctor');
const exam = require('./exam');

const router = express.Router();

router.use('/user', user);
router.use('/doctor', doctor);
router.use('/exam', exam);

module.exports = router;