const express = require('express');

const adminRouter = express.Router();
const {httpgetAdminSettings} = require('./admin.controller');
const {httpSetAdminSettings} = require('./admin.controller');

adminRouter.get('/adminSettings',httpgetAdminSettings);
adminRouter.post('/adminSettings',httpSetAdminSettings);
module.exports = adminRouter;