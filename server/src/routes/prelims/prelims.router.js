const express = require('express');
const {
    getAllPrelimsData

} = require('./prelims.controller');
const prelimsRouter = express.Router();
prelimsRouter.get('/prelimsdata', getAllPrelimsData);

module.exports = prelimsRouter;