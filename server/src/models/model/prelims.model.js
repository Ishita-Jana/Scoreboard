const axios = require('axios');
const prelims = require('../schemas/prelims.mongo');

async function loadPrelimsData(req,res) {
    try {
        const prelimsData = await prelims.find({},);
        return prelimsData;
    } 
    catch (error) {
        console.log("error",error.message);
    }
}

async function addPrelimScore(teamCode, judgeName, scores) {
   
}


async function updatePrelimScore(teamCode, judgeName, scores) {

}
   
module.exports = {
    loadPrelimsData,
    addPrelimScore,
    updatePrelimScore
}








