const express = require('express');

const adminRouter = express.Router();
const {httpgetAdminSettings} = require('./admin.controller');
const {httpSetAdminSettings} = require('./admin.controller');
const {httpLogin} = require('./admin.controller');
// const {authAdmin} = require('../../middleware/middleware');

adminRouter.get('/adminSettings',httpgetAdminSettings);
adminRouter.post('/adminSettings',httpSetAdminSettings);
adminRouter.post('/login',httpLogin);
// adminRouter.post('/admin/home',authAdmin,(req,res)=>{
//     res.sendFile
// });
module.exports = adminRouter;