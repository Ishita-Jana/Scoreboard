//all the express code

const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./routes/api_v1');
const { httpGetAllPrelimsData } = require('./routes/prelims/prelims.controller');
const { loadPrelimsData } = require('./models/model/prelims.model');
const prelimsRouter = require('./routes/prelims/prelims.router');
const app = express();


app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use('/',prelimsRouter);
// app.use('/prelimsData', prelimsRouter);
app.use('/', (req, res) => {
    res.send('Welcome to the server');
})

module.exports = app;
