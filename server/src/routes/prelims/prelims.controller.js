const prelims = require('../../models/prelims.model');



function getAllPrelimsData(req,res) {
    return res.status(200).json(prelims);
}

module.exports = {
    getAllPrelimsData
}