const express = require('express');
const router = express.Router();
const db = require('../config');

//Get all user
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).json({
					error : err.message,
					sql: err.sql
			})
		}
		return res.json(results)
		})
});

//Get one user
router.get("/:id", (req, res) => {
	let sql = 'SELECT * from user WHERE id = ?'
	const idUser = req.params.id 
	db.query(sql,[idUser], (err, results) => {
	  if (err) {
		res.status(500).send('Erreur lors de la récupération d\'un utilisateur');
	  } else {
		res.json(results);
	  }
	});
  });

// post one doctor
router.post('/', (req, res) => {
	const formBody = req.body;
	db.query('INSERT INTO user SET ?', [formBody], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la modification du patient');
		};
		return res.sendStatus(201);
		});
});


//Delete one user
router.delete('/:id', (req, res) => {
	let sql = 'DELETE FROM user WHERE id = ?'
	const userId = req.params.id;
	db.query(sql, userId, err => {
	  if (err) {
		console.log(err);
		res.status(500).send("Erreur lors de la supression d'un utilisateur");
	   } else {
		res.sendStatus(200);
	  }
	});
  });

// Get all exam for one user
router.get("/:id/exams", (req, res) => {
	const idExam = req.params.id;
	let sql = 'SELECT * FROM user_has_exam AS ue JOIN user AS u ON ue.user_id = u.id JOIN exam AS e ON ue.exam_id = e.id WHERE u.id = ?'
	db.query(sql, [idExam], (err, results) => {
	  if (err ) {
		res.status(500).json({
			error: err.message,
			sql: err.sql
		  });
	  }
	  else {
		return res.status(200).json({data: results});
	  }
	});
  });

//Get one exam for one user
router.get('/:idUser/exams/:idExam', (req, res) => {
	const idUser = req.params.idUser;
	const idExam = req.params.idExam;
	let sql = 'SELECT * FROM user_has_exam AS ue JOIN user AS u ON ue.user_id = u.id JOIN exam AS e ON ue.exam_id = e.id WHERE u.id = ? AND e.id = ?'
	db.query(sql, [idUser, idExam], (err, results) => {
	  if(err){
		res.status(500).json({
		  error: err.message,
		  sql: err.sql
		});
	  }
	  else{
		res.json({data: results});
	  }
	});
});

module.exports = router;