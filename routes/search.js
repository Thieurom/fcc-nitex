const express = require('express');
const service = require('../service');


const router = express.Router();

router.get('/', (req, res, next) => {
    const location = req.query.query;
    let userId;

    service(userId, location, (err, result) => {
        if (err) {
            return next(err);
        }

        res.set({ 'Cache-Control': 'no-cache' });
        return res.status(200).json(result);
    });

});


module.exports = router;
