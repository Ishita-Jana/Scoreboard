const express = require('express');

const prelimsRouter = express.Router();
const {httpGetAllPrelimsData} = require('./prelims.controller');
const {httpAddScore} = require('./prelims.controller');
const {httpUpdateScore} = require('./prelims.controller');


prelimsRouter.get('/prelimsAllData',httpGetAllPrelimsData);
prelimsRouter.post('/prelims/:round',httpAddScore);
prelimsRouter.put('/prelims/:id',httpUpdateScore);
   

module.exports = prelimsRouter;