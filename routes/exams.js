const express = require('express');
const router = express.Router();
const db = require('../config');

//Get all exam
router.get('/', (req, res) => {
  db.query('SELECT * FROM exam', (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération de tous les examens médicaux');
		};
		return res.sendStatus(200);
		});
});

//Get one exam
router.get('/:id', (req, res) => {
	const {id} = req.params;
  	db.query('SELECT * FROM exam WHERE id = ?', [id], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération de l\'examen médical');
		};
		return res.sendStatus(200);
		});
});


// post one exam
router.post('/', (req, res) => {
	const formBody = req.body;
	db.query('INSERT INTO exam SET ?', [formBody], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la création de l\'examen médical');
		};
		return res.sendStatus(201);
		});
});

// delete one exam 
router.delete('/:id', (req, res) => {
	const {id} = req.params;
	db.query('DELETE FROM exam WHERE id = ?', [id], (err, result) =>  {
		if(err) {
			res.send(500).json('Erreur lors de la suppression de l\'examen médical');
		} else {
			return res.sendStatus(200);
		};
	});
});

module.exports = router;