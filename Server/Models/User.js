const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  projects: [ProjectSchema], // Embedding Project schema
});

userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema);
