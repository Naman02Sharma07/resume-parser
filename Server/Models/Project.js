const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/resume")

const ProjectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    timeline:{
        start:{
            type:Date,
            required:true
        },
        End:{
            type:Date,
            required:true
        }
    },
    summary:{
        type:String,
        required:true,
        trim:true
    },
    tech_stack: {
        type: [String], // Array of strings for technologies used
        default: []     // Default to an empty array if not provided
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: 'Invalid URL format!'
        }
    }
})

ProjectSchema.plugin(plm);
mongoose.exports = mongoose.model("Project",ProjectSchema);
