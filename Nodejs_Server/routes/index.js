const express = require('express');

const router = express.Router();

router.get('/test', (req, res, next)=>{
    console.log('success');
    res.json({success : 1});
});

module.exports = router;