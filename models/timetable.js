const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let period = new Schema({
    range: {
        type: String,
        unique: false
    },
    room: {
        type: String,
        unique: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

let timetableSchema = new Schema(
    {
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        },
        schedule: [
            {
                periods: [period]
            }
        ],
    },
    {
        timestamps: true
    },
);

let Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
