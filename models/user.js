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
        isAdmin: {
            type: Boolean,
            default: false,
        },
        dob: {
            type: Date,
            default: null,
        },
        interests: [{
            type: String
        }],
        bio: {
            type: String,
            default: 'Boring user... did not care to add a bio😪😪',
        },
        description: {
            type: String,
            default: null,
        },
        instagram: {
            type: String,
            default: null
        },
        facebook: {
            type: String,
            default: null
        },
        twitter: {
            type: String,
            default: null
        },
        linkedin: {
            type: String,
            default: null,
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
            default: 'student'
        },
    },
    {
        timestamps: true
    },
);

let User = mongoose.model('User', userSchema);

module.exports = User;
