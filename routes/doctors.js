const express = require('express');
const router = express.Router();
const db = require('../config');

//Get all doctors
router.get('/', (req, res) => {
  db.query('SELECT * FROM doctor', (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération de tous les docteurs');
		};
		return res.sendStatus(200);
		});
});

//Get one doctor
router.get('/:id', (req, res) => {
	const {id} = req.params;
  	db.query('SELECT * FROM doctor WHERE id = ?', [id], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération du docteur');
		};
		return res.sendStatus(200);
		});
});

// get all patients of one doctor
router.get('/:idDoctor/users', (req, res) => {
	const {idDoctor} = req.params;
})


// post one doctor
router.post('/', (req, res) => {
	const formBody = req.body;
	db.query('INSERT INTO doctor SET ?', [formBody], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la création du docteur');
		};
		return res.sendStatus(201);
		});
});

// delete one doctor 
router.delete('/:id', (req, res) => {
	const {id} = req.params;
	db.query('DELETE FROM doctor WHERE id = ?', [id], (err, result) =>  {
		if(err) {
			res.send(500).json('Erreur lors de la suppression du docteur');
		} else {
			return res.sendStatus(200);
		};
	});
});

module.exports = router;