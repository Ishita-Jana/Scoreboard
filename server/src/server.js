//server functions

const http=require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const {loadPrelimsData} = require('./models/model/prelims.model');
const {loadPairMatchesData} = require('./models/model/pairMatches.model');
const {mongoConnect} = require('./services/mongo');

const PORT =process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer(){

    await mongoConnect();
    await loadPrelimsData();
    await loadPairMatchesData();

    server.listen(PORT, ()=>{
        console.log(`app listeninig on port ${PORT}`);
    })
}

startServer();
