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
        email1: {
            fromRegDay: {type: Number, default: 10},
            fromTodayDay: {type: Number, default: 0},
            emailSendDate: {type: Date},
            status: {type: String},//sent or pending or stopped 
        },
        email2: {
            fromRegDay: {type: Number, default: 10},
            fromTodayDay: {type: Number, default: 0},
            emailSendDate: {type: Date},
            status: {type: String},//sent or pending or stopped 
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema)

module.exports = User;