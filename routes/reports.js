var express = require('express');
var router = express.Router();

// SQLITE
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

// Bodyparser
const bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const verify = require('./verifyToken.js');



// Get all posts
router.get('/', verify, (req, res) => {

    const sql = 'SELECT * FROM posts';

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.json(err);
        }
        const posts = [];
        rows.forEach((row) => {
            posts.push(row);
        });

        res.json(posts);
    });
});

// Get all posts
router.get('/week/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM posts WHERE id LIKE ?';

    db.all(sql, id, (err, rows) => {
        if (err) {
            res.json(err);
        }
        const posts = [];
        rows.forEach((row) => {
            posts.push(row);
        });

        res.json(posts);
    });
});

// Insert posts
router.post('/', verify, (req, res) => {

    let title = req.body.title;
    let body = req.body.body;

    console.log(title, body);

    db.run("INSERT INTO posts (title, body) VALUES (?, ?)", title, body, (err) => {
        
        if (err) {
            res.json(err); 
        }
        
        const data = {
            data: {
                msg: "Post inserted"
            }
        }

        res.json(data);
    });
});

router.patch('/:id', verify, (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let id = req.params.id;

    db.run("UPDATE posts SET title = ?, body = ? WHERE id = ?", title, body, id, (err) => {
        if (err) {
            res.json(err);
        }

        const data = {
            data: {
                msg: "Post updated"
            }
        }

        res.json(data);
    });
});


// router.put('/', verify, (req, res) => {

//     let title = req.body.title;
//     let body = req.body.body;

//     console.log(title, body);

//     db.run("INSERT INTO posts (title, body) VALUES (?, ?)", title, body, (err) => {
        
//         if (err) {
//             res.send(err); 
//         }
        
//         const data = {
//             data: {
//                 msg: "Post inserted"
//             }
//         }

//         res.json(data);
//     });
// });

module.exports = router;