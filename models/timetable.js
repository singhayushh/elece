const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timetableSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        schedule: [
            {
                range: String,
                room: String,
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
