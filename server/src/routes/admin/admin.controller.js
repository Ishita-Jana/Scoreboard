const admins = require('../../models/schemas/admin.mongo');
const {getAdminSettings,updateAdminSettings,adminLogin} = require('../../models/model/admin.model');

async function httpgetAdminSettings(req,res) {
 const adminSettings = await getAdminSettings();
 console.log("round",adminSettings.data,adminSettings.data.round);
 return res.status(200).json(adminSettings.data);
}



async function httpSetAdminSettings(req,res) {
 const set = req.body;
 const adminSettings = await updateAdminSettings(set);
 return res.status(200).json(adminSettings);
}

module.exports = {
    httpgetAdminSettings,
    httpSetAdminSettings
}