const express = require("express");
const users = require('./users');
const doctors = require('./doctors');
const exams = require('./exams');
const auth = require('./auth');

const router = express.Router();

router.use('/users', users);
router.use('/doctors', doctors);
router.use('/exams', exams);
router.use('/auth', auth);

module.exports = router;