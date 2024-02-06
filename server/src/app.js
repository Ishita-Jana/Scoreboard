//all the express code

const express = require('express');
const cors = require('cors');
const prelimsRouter = require('./routes/prelims/prelims.router');
const app = express();


app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
app.use(prelimsRouter);

module.exports = app;
