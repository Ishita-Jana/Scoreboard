//all the express code
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const prelimsRouter = require('./routes/prelims/prelims.router');
const adminRouter = require('./routes/admin/admin.router');
const pairMatchesRouter = require('./routes/pairMatches/pairMatches.router');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors({
    origin: 'https://xim-mcc.netlify.app/'
}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.json());
app.use('/',prelimsRouter);
app.use('/',adminRouter);
app.use('/',pairMatchesRouter);


app.use('/', (req, res) => {
    res.send('Welcome to the server');
})

module.exports = app;
