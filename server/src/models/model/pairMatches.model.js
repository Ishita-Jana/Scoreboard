const pairMatches = require('../schemas/pairmatches.mongo');

async function loadPairMatchesData(req,res) {
    const pairMatchesData = await pairMatches.find();
    return pairMatchesData;
}

async function addPairMatchData(teamCode, judgeName, scores) {

}

async function updatePairMatchData(teamCode, judgeName, scores) {

}
module.exports = {
    loadPairMatchesData,
    addPairMatchData,
    updatePairMatchData
}