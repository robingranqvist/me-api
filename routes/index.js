var express = require('express');
var router = express.Router();

// Index
router.get('/', (req, res) => {
    res.json({
        post: {
            title: 'Robins Me-sida',
            content: 
            `Välkommen till Robins me-sida. Jag är en 26 årig kille från södra Finland som gillar mat, musik, design, det mesta som har med webben att göra, hundar, att städa osv.

            Denna sida är skapad för kursmoment 2 i jsramverk-kursen vid Blekinge Tekniska Högskola.`
        }
    });
});

module.exports = router;