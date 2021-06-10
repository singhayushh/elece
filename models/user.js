const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        picture: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            default: null,
        },
        interests: [
            {
                type: String
            },
        ],
        bio: {
            type: String,
            default: '🎯 Focusing',
        },
        description: {
            type: String,
            default: null,
        },
        instagram: {
            type: String,
            default: '',
        },
        facebook: {
            type: String,
            default: '',
        },
        twitter: {
            type: String,
            default: '',
        },
        linkedin: {
            type: String,
            default: '',
        },
        cover: {
            type: String,
            default: null,
        },
        accent: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: 'unverified'
        },
        role: {
            type: String,
            default: 'student'
        },
        defaultClass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            default: null
        },
        classes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Class'
            }
        ]
    },
    {
        timestamps: true
    },
);

let User = mongoose.model('User', userSchema);

module.exports = User;
