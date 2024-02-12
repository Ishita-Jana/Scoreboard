const prelims = require('../../models/model/prelims.model');

const { loadPairMatchesData,addPairMatchData,getCurrentRoundData,updatePairMatchData} = require('../../models/model/pairMatches.model');

async function httpGetAllPairMatchesData(req, res) {
    const pairMatchesData = await loadPairMatchesData();
    return res.status(200).json(pairMatchesData);
}

async function httpAddMatchScore(req, res) {
    const data = req.body;
    // console.log(data,"inside add");
    const response = await addPairMatchData(data);
    // console.log(response,"response");
    return res.status(200).json(response);
}

async function httpGetCurrentScore(req, res) {
    const data = req.body.round;
    // console.log(data);
    // console.log(data.round);
    const response = await getCurrentRoundData(data);
    // console.log(response);
    return res.status(200).json(response);
}

async function httpUpdatePairMatchesScore(req, res) {
    const { teamCode, judgeName, scores } = req.body;
    const response = await updatePairMatchData(teamCode, judgeName, scores);
    return res.status(200).json(response);
}



module.exports = {
    httpGetAllPairMatchesData,
    httpAddMatchScore,
    httpGetCurrentScore,
    httpUpdatePairMatchesScore
}