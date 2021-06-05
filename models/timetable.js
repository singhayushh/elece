const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timetableSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        schedule: [],
    },
    {
        timestamps: true
    },
);

let Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
