const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noticeSchema = new Schema(
    {
        path: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        short: {
            type: String,
            required: true,
        },
        long: {
            type: String,
            default: null,
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    },
);

let Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
