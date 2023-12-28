const mongoose = require("mongoose");
const { Schema } = mongoose;
const Userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
  },
  friends: {
    type: Array,
  },
  repos: {
    type: Array,
  },
  readme: {
    type: String,
  },
});
module.exports = mongoose.model("user", Userschema);
