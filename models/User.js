const mongoose = require("mongoose");
const { Schema } = mongoose;

// this schema for the auth.js
const UserSchema = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  mobilenumber: {
    type: Number,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
