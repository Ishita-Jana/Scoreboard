const admin = require('../schemas/admin.mongo');

async function getAdminSettings() {
    const adminSettings = await admin.findOne({category:"settings"});
    // console.log("adminSettings",adminSettings);
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

async function adminLogin(name,pass) {
    const data = await admin.findOne({category:"login"});
    const roles = data.roles;
    let role = null;

    roles.find((user) => {
        if (user.username === name && user.password === pass) {
            role = user.role;
            return true; 
        }
    return false;
    });

        if(role ){
            
            return {ok:true, message:"Login successful", role:role};
        }

        else{
            return {ok:false, message:"Invalid username or password"};
        }
     
     
   
}


module.exports = {
    getAdminSettings,
    updateAdminSettings,
    adminLogin
}