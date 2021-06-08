const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            }
        ],
    },
    {
        timestamps: true
    },
);

let Class = mongoose.model('Class', classSchema);

module.exports = Class;
