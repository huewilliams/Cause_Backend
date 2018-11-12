const express = require('express');

const router = express.Router();

const connect = require('../db/connect')();

let connection = connect.init();
connect.open(connection);

router.post('/reward/show', (req, res) => {
    var funding_key = req.body.funding_key;

    connection.query('SELECT reward_key, reward_name, reward_price FROM Cause.funding_reward WHERE funding_key = ?', funding_key, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.send(rows);
        }
    });
});

router.post('/sponsor/register', (req, res) => {
    var user_key = req.body.user_key;
    var sponsor_name = req.body.sponsor_name;
    var sponsor_birth = req.body.sponsor_birth;
    var sponsor_gender = req.body.sponsor_gender;
    var sponsor_email = req.body.sponsor_email;
    var sponsor_phone = req.body.sponsor_phone;
    var sponsor_address = req.body.sponsor_address;
    var sponsor_address_detail = req.body.sponsor_address_detail;
    var sponsor_verifycode = req.body.sponsor_verifycode;

    connection.query('INSERT INTO Cause.funding_reward (user_key, sponsor_name, sponsor_birth, sponsor_gender, sponsor_email, sponsor_phone, sponsor_address, sponsor_address_detail, sponsor_verifycode) VALUES ? ;', [user_key, sponsor_name, sponsor_birth, sponsor_gender, sponsor_email, sponsor_phone, sponsor_address, sponsor_address_detail, sponsor_verifycode], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.send(rows);
        }
    });
});

router.post('/funding/category', (req, res)=>{
    connection.query('SELECT category_name FROM Cause.funding_category', (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

router.post('/donation/category', (req, res)=> {
    connection.query('SELECT * FROM Cause.donation_category', (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

router.post('/funding/banner', (req, res)=> {
    connection.query('SELECT funding_key, funding_title, funding_intro, funding_profile FROM Cause.funding_info', (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

router.post('/funding/list', (req, res)=> {
    let data = req.body.funding_category;
    connection.query('SELECT funding_key, funding_profile, funding_title, funding_context, funding_progress, funding_restoration, funding_supporternum, funding_period FROM Cause.funding_info WHERE funding_category = ?', data, (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

router.post('/donation/list', (req, res)=> {
    let data = req.body.donation_category;
    connection.query('SELECT donation_key, donation_title, donation_context FROM Cause.donation_info WHERE donation_category = ?', data, (err, rows)=> {
        if(err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;

