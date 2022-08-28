const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: { type: String, required: true, unique: true, validate: validator.isEmail},
        password: {type: String, required: true},
        role: {type: String, required: true, default: 'client'},
        image: {type: String, required: true, default: 'image'},
        emailToken: {type: String},
        isVerified: {type: Boolean},
        resetpasswordToken: {type: String},
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema)

module.exports = User;