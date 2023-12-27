const mongoose = require("mongoose");
const { Schema } = mongoose;
const Friends = new Schema({
  friend_id: {
    type: String,
    required: true,
  }
});
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
    default: [Friends],
  },
  readme:{
    type:String,
  }
});
module.exports = mongoose.model("user", Userschema);