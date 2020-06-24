const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const db = require('../config');

router.get('/', (req, res) => {

  db.query('SELECT * FROM user', (err, results) => {
		if (err) {
			return res.status(500).json({
					error : err.message,
					sql: err.sql
			})
		}
		return res.json(results)
		})
});

module.exports = router;