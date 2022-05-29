const mongoose = require('mongoose');

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Static methods
UserSchema.statics.findOneByUsername = function(strUsername) {
  return this.findOne({ username: strUsername });
};

UserSchema.statics.findOneByDisplayName = function(strDispName) {
  return this.findOne({ displayName: strDispName });
};
