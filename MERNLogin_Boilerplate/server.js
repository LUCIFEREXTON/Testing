require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes/router')
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT,
}))
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use('/api', (req, res, next) => {

    console.log('in middleware');
    const { headers } = req;
    if (headers['authtoken'] !== 'somesecretkey') {
        return res.json({ msg: 'You Are not allowed', status: 403 });
    }


    next();
}, router);


app.listen(port, () => console.log(`Server running on ${port}`));