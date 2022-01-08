const mongoose = require('mongoose');
const userSchema = require('../schema/user.schema');

const User = mongoose.model("user", userSchema);

module.exports = User;