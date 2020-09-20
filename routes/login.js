const jwt = require('jsonwebtoken');
require('dotenv').config();

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

// Index
router.post('/', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const email = req.body.email;
    const plainPw = req.body.password;

    // Checks user
    db.all(sql, [email], (err, rows) => {
        rows.forEach((row) => {
            const hash = row.password;

            // console.log("HASH: ", hash);
            // console.log("EMAIL: ", email);
            // console.log("PLAIN: ", plainPw);

            if (err) {
                res.send(err);
            }
            
            bcrypt.compare(plainPw, hash, function(err, result) {
                if (err) {
                    res.send("Something went wrong");
                }

                if (result) {
                    // const payload = { email: row.email };
                    // const secret = process.env.TOKEN_SECRET;
                    // const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                    const token = jwt.sign({ _id: row.email }, process.env.TOKEN_SECRET);
                    res.header('auth-token', token).send(token);
                }
            });
        });
    });

    // db.run("SELECT * FROM users WHERE email = ? AND password = ?",
    // "asdasdadqwr@example.com",
    // "test", (err) => {
    //     if (err) {
    //         res.json(err);
    //     } else {
            
    //     }

    //     const data = {
    //         data: {
    //             msg: "Found"
    //         }
    //     }

    //     res.json(data);
    // });
});

module.exports = router;