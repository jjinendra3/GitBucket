const mongoose = require("mongoose");
const { Schema } = mongoose;
const Repo = new Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
  commits: {
    type: Array,
  },
});
module.exports = mongoose.model("repo", Repo);
