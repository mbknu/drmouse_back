const express = require('express');
const router = express.Router();
const db = require('../config');

//Get all doctors
router.get('/', (req, res) => {
  db.query('SELECT * FROM doctor', (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération de tous les docteurs');
		};
		return res.status(200).json(results)
		});
});

//Get one doctor
router.get('/:id', (req, res) => {
	const {id} = req.params;
  	db.query('SELECT * FROM doctor WHERE id = ?', [id], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la récupération du docteur');
		};
		return res.status(200).json(results)
		});
});

// get all patients of one doctor
router.get('/:idDoctor/users', (req, res) => {
	const {idDoctor} = req.params;
	db.query('SELECT * FROM user AS u JOIN doctor_has_user AS du ON u.id = du.user_id JOIN doctor AS d ON d.id = du.doctor_id WHERE d.id = ?', [idDoctor], (err, result) => {
		if(err) {
			return res.status(500).json('Erreur lors de la récupération de tous les patients d\'un docteur');
		} else {
			return res.status(200).json(results);
		};
	});
});


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

// join doctor - patient
router.post('/:idDoctor/users/:idUser', (req, res) => {
	const {idDoctor, idUser} = req.params;
	db.query('INSERT INTO doctor_has_user (doctor_id, user_id) VALUES (?, ?)', [idDoctor, idUser], (err, results) => {
		if(err) {
			return res.status(500).json('Erreur lors de la jointure docteur-user');
		};
		return res.sendStatus(201);
	});
});

// delete doctor -user  
router.delete('/:idDoctor/users/:idUser', (req, res) => {
	const {idDoctor, idUser} = req.params;
	db.query('DELETE FROM doctor_has_user WHERE doctor_id = ? AND user_id = ?', [idDoctor, idUser], (err, result) =>  {
		if(err) {
			res.send(500).json('Erreur lors de la suppression docteur - user');
		} else {
			return res.sendStatus(200);
		};
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