const Jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const {getAdminSettings,updateAdminSettings,adminLogin} = require('../../models/model/admin.model');


async function httpgetAdminSettings(req,res) {
 const adminSettings = await getAdminSettings();
//  console.log("round",adminSettings.data,adminSettings.data.round);
 return res.status(200).json(adminSettings.data);
}



async function httpSetAdminSettings(req,res) {
 const set = req.body;
 const adminSettings = await updateAdminSettings(set);
 return res.status(200).json(adminSettings);
}

async function httpLogin(req,res) {

 const {username, password} = req.body;
 const login = await adminLogin(username,password);
 console.log("response",login);
 if(login.ok){
    const response = Jwt.sign({user: login.role}, secret,{ expiresIn: '5d'},(err,token)=>{
        if(err){
                console.log(err);
                // return {ok:false, message: 'internal server error'};
                res.status(500).json({message: 'internal server error'});
                }
        else{
                console.log(token);
                console.log("login done");
                // return {ok:true,username:username ,token: token, role:login.role};
                res.status(200).json({ok:true,username:username ,token: token, role:login.role});
            }
                    
    });
    
 }
 else{
    console.log("error");
     return res.status(401).json({ok:false , message: 'unauthorized'});
 }
}

module.exports = {
    httpgetAdminSettings,
    httpSetAdminSettings,
    httpLogin
}