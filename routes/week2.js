var express = require('express');
var router = express.Router();

// Index
router.get('/', (req, res) => {
    res.json({
        post: {
            title: 'KMOM02 - Backend',
            content: 
            `Detta är readme-filen till mitt back-end API. Börja med att ladda ned filerna från detta repo. Därefter kör du kommandot "npm install" för att installera alla dependencies för projektet. Kör igång en live server genom kommandot "npm start". Efter det är det bara att köra igång och ta en titt på min lilla applikation där man kan registrera sig, logga in och skriva några posts om man vill. :)`
        }
    });
});

module.exports = router;