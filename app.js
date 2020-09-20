// Libraries
const express = require('express');
const app = express();
const port = 3030;
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());
// Routes
const index = require('./routes/index');
const hello = require('./routes/hello');
const register = require('./routes/register');
const login = require('./routes/login');
const reports = require('./routes/reports');

// Weeks
const week1 = require('./routes/week1');
const week2 = require('./routes/week2');

// Routes
app.use('/', index);
app.use('/hello', hello);
app.use('/register', register);
app.use('/login', login);
app.use('/reports', reports);

// Week-routes
app.use('/reports/week/1', week1);
app.use('/reports/week/2', week2);



if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); 
}

// 404
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// 404
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.listen(port, () => console.log(`Api listening to port ${port}`));