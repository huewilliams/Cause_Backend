const express = require('express');
const router = express.Router();

const connect = require('../db/connect')();
const uuidv4 = require('uuid/v4');
let connection = connect.init();
connect.open(connection);

router.post('/signup', (req, res) => {
    let data = {
        user_key : uuidv4(),
        user_name: req.body.user_name,
        user_birth: req.body.user_birth,
        user_gender: req.body.user_gender,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        user_address_detail: req.body.user_address_detail
    };

    connection.query('INSERT INTO Cause.user_info SET ?', data, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.sendStatus(200);
        }
    });
    //connection.end();
});

router.post('/show', (req, res)=>{
    let data = req.body.user_name;
    connection.query('SELECT user_name, user_birth, user_gender, user_email, user_phone, user_address, user_address_detail FROM Cause.user_info WHERE user_name = ?', data, (err, rows)=>{
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

router.post('/modify', (req, res)=> {
    let data = {
        user_name: req.body.user_name,
        user_birth: req.body.user_birth,
        user_gender: req.body.user_gender,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        user_address_detail: req.body.user_address_detail
    };

    connection.query('UPDATE Cause.user_info SET ?', data, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.sendStatus(200);
        }
    })
});

router.post('/signin', (req, res)=> {
    let data = req.body.user_key;
    connection.query('SELECT user_key FROM Cause.user_info WHERE user_key = ?', data, (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            console.log(rows.length);
            if (rows.length == 1) {
                res.sendStatus(200);
            } else {
                res.status(500).json({code : 500, message : 'Sign in error'});
            }
        }
    })
});

module.exports = router;