const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            }
        ],
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    },
);

let Class = mongoose.model('Class', classSchema);

module.exports = Class;
