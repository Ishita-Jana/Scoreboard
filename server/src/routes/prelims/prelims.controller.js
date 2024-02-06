const prelims = require('../../models/model/prelims.model');

const {loadPrelimsData} = require('../../models/model/prelims.model');

async function httpGetAllPrelimsData(req,res) {
    const prelimsData = await loadPrelimsData(req,res);
    return res.status(200).json(prelimsData);
}

async function httpAddScore(req, res) {
    const { teamCode, judgeName, scores } = req.body;
    const response = await addScore(teamCode, judgeName, scores);
    return res.status(200).json(response);
}

async function httpUpdateScore(req, res) {
    const { teamCode, judgeName, scores } = req.body;
    const response = await updateScore(teamCode, judgeName, scores);
    return res.status(200).json(response);
}

module.exports = {
    httpGetAllPrelimsData,
    httpAddScore,
    httpUpdateScore
}