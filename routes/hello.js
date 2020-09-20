var express = require('express');
var router = express.Router();

// Index
router.get('/', (req, res) => {
    const data = {
        data: {
            msg: "HELLO"
        }
    }

    res.json(data);
});

module.exports = router;