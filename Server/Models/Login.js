const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/resume");


const LoginSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})
LoginSchema.plugin(plm);
module.exports = mongoose.model("Login",LoginSchema);
