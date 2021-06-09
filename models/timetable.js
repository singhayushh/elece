const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timetableSchema = new Schema(
    {
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        },
        schedule: [
            {
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
            }
        ],
    },
    {
        timestamps: true
    },
);

let Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
