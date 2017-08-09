const express = require('express');
const path = require('path');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
});


module.exports = router;
