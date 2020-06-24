const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../config');

const router = express.Router();

// create user patient
router.post('/signup', [
    check('email').isEmail(), 
    check('password').isLength({min:5})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    };
    const hash = bcrypt.hashSync(req.body.password, 10);
    const formData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        sexe: req.body.sexe,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        sport: req.body.sport,
        smoker: req.body.smoker,
        cardiac_disease: req.body.cardiac_disease,
        glasses: req.body.glasses,
        phone: req.body.phone,
        email: req.body.email,
        password: hash
    };
    db.query('SELECT * FROM user WHERE email = ?', [formData.email], (err, result) => {
        if(result.length === 0) {
            db.query('INSERT INTO user SET ?', [formData], (err2, result2) => {
                if(err2) {
                    res.status(500).send(err2);
                } else {
                    res.sendStatus(201);
                };
            });
        } else {
            res.status(500).send(err);
        };
    });
});

// create token patient
router.post('/login', (req, res) => {
    const formData = {
        email: req.body.email,
        password: req.body.password
    };
    db.query('SELECT * FROM user WHERE email = ?', [formData.email], (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            const samePwd = bcrypt.compareSync(formData.password, result[0].password);
            if(!samePwd){
                res.status(500).send('Wrong password');
            } else {
                console.log(result)
                jwt.sign({result}, process.env.JWT_KEY, (err, token) => {
                    res.json({token});
                });
            };
        };
    });
});

// go to profile patient
router.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authdata) => {
        if (err) {
            res.status(403).send(err);
        } else {
            res.json({
                message: 'Access ok',
                authdata
            });
        };
    });
});

// function before go to profile to verify the id
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(500);
    };
};

module.exports = router;