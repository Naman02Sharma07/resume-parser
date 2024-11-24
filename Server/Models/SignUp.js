const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/resume")



const SignSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    }
})
SignSchema.plugin(plm);
module.exports = mongoose.model("SignUp",SignSchema);