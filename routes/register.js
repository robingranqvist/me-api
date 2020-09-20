var express = require('express');
var router = express.Router();

// Bcrypt
const bcrypt = require('bcryptjs');

// SQLITE
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

// Bodyparser
const bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.post('/', async (req, res) => {
    
    let password = req.body.password;
    let email = req.body.email;

    //Hash pw
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        email,
        hashedPw, (err) => {
        if (err) {
            res.send(err);
        }
        
        const data = {
            data: {
                msg: "You are registered"
            }
        }

        res.json(data);
    });
});

module.exports = router;