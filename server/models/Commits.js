const mongoose = require("mongoose");
const { Schema } = mongoose;
const filestrr = new Schema({
  line: {
    type: Number,
  },
  oldline: {
    type: String,
  },
  newline: {
    type: String,
  },
});
const files = new Schema({
  filename: {
    type: String,
  },
  filestr: {
    type: Array,
    default: [filestrr],
  },
});
const Commits = new Schema({
  repoid: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    default: [files],
  },
});
module.exports = mongoose.model("commits", Commits);
