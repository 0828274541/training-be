'use strict';
/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const { USERS } = require('../constant/index');
const Schema = mongoose.Schema;
/**
 * User Schema
 */
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  lastLogout: { type: Date, default: new Date() },
  lastChangedPassword: { type: Date, default: new Date() },
  role: {
    type: [{
      type: String,
      enum: [USERS.ROLE.NORMAL, USERS.ROLE.CONTRIBUTOR, USERS.ROLE.ADMIN]
    }],
    default: [USERS.ROLE.NORMAL]
  },
});
userSchema.plugin(paginate);


mongoose.model('User', userSchema).createCollection();

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
