const express = require('express');

const router = express.Router();

const connect = require('../db/connect')();

let connection = connect.init();
connect.open(connection);

router.post('/detail', (req, res) => {
    let result = {};
    let data = req.body.funding_key;
    connection.query('SELECT funding_title, funding_company, funding_context, funding_likenum, funding_progress, funding_restoration, funding_supporternum, funding_period, funding_achieve, funding_goal, funding_schedule FROM Cause.funding_info WHERE funding_key = ?', data,  (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            let temp = rows[0].funding_company;
            console.log(rows[0].funding_company);
            connection.query('SELECT company_phone, company_email, company_address FROM Cause.company_info WHERE company_key = ?', temp, (err, com) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({code: 500, message: 'SQL error'});
                } else {
                    rows['company_phone'] = com.company_phone;
                    rows['company_email'] = com.company_email;
                    rows['company_address'] = com.company_address;
                    connection.query('SELECT subs_title, subs_photo, subs_context FROM Cause.funding_subs WHERE funding_key = ?', data, (err, sub)=>{
                        if(err) {
                            console.log(err);
                            res.status(500).json({code : 500, message : 'SQL error'});
                        } else {
                            result = Object.assign(result,rows, sub[0], sub[1]);
                            res.json(result);
                        }
                    })
                }
            })
        }
    })
});



router.post('/like', (req, res) => {
    let funding_key = req.body.funding_key;

    connection.query('SELECT funding_likenum FROM Cause.funding_info WHERE funding_key = ?', funding_key, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({code: 500, message: 'SQL error'});
        } else {
            connection.query('UPDATE Cause.funding_info SET funding_likenum = ? WHERE funding_key = ?', [Number(rows[0].funding_likenum) + 1, funding_key], (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({code: 500, message: 'SQL error'});
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

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

module.exports = router;

