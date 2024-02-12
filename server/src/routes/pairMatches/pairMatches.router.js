const express = require('express');

const pairMatchesRouter = express.Router();
const {httpGetAllPairMatchesData} = require('./pairMatches.controller');
const {httpAddMatchScore} = require('./pairMatches.controller');
const { httpUpdatePairMatchesScore} = require('./pairMatches.controller');
const { httpGetCurrentScore } = require('./pairMatches.controller');


pairMatchesRouter.get('/pairMatches',httpGetAllPairMatchesData);
pairMatchesRouter.post('/pairMatchesCurr',httpGetCurrentScore);
pairMatchesRouter.post('/pairMatches',httpAddMatchScore);
pairMatchesRouter.put('/pairMatches/', httpUpdatePairMatchesScore);
   

module.exports = pairMatchesRouter;