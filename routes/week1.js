var express = require('express');
var router = express.Router();

// Index
router.get('/', (req, res) => {
    res.json({
        post: {
            title: 'KMOM01 - Frontend',
            content: 
            `Att köra igång denna applikation är relativt simpelt. Börja med att ladda ned den genom att gå in på repot och klicka den lilla gröna "Code" knappen i högra hörnet. Här kan du välja om du vill ladda ned den genom terminalen (git clone), alternativt i ett zip-paket. Därefter öppnar du upp mappen i valfri text editor. Installera modulerna som används i projektet genom att göra kommandot "npm install" och vänta tills dessa har laddats ned. Därefter kan du köra igång en live-server genom terminalen med hjälp av kommandot "npm start". Besök därefter addressen som visas i terminalen, och upplev min vackra app i all sin fröjd.`
        }
    });
});

module.exports = router;