const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    },
);

let Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;