const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;