//all the express code

const express = require('express');
const cors = require('cors');
const path = require('path');
const { httpGetAllPrelimsData } = require('./routes/prelims/prelims.controller');
const { loadPrelimsData } = require('./models/model/prelims.model');
const prelimsRouter = require('./routes/prelims/prelims.router');
const adminRouter = require('./routes/admin/admin.router');
const app = express();


app.use(express.json());
var whitelist = ['http://localhost:3000/', 'https://xim-mcc.netlify.app/']
app.use(cors({
    origin: '*'
}));

app.use('/',prelimsRouter);
app.use('/',adminRouter);
// app.use('/prelimsData', prelimsRouter);
app.use('/', (req, res) => {
    res.send('Welcome to the server');
})

module.exports = app;
