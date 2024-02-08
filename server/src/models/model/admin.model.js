const admin = require('../schemas/admin.mongo');

async function getAdminSettings() {
    const adminSettings = await admin.findOne({category:"settings"});
    console.log("adminSettings",adminSettings);
    return adminSettings;
    
}

async function updateAdminSettings(data) {
    console.log("data",data);
    const update = {
        data:{
            round: data.round,
            judgeNumber: data.judgeNumber
        }
    }
    const adminSettings = await admin.findOneAndUpdate({category:"settings"},update,{
        returnOriginal: false
      });
    console.log("new settings",adminSettings);
    return adminSettings;    
}

async function adminLogin(req,res) {

}


module.exports = {
    getAdminSettings,
    updateAdminSettings,
    adminLogin
}