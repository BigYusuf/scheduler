const express = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true, default: 'client'},
        image: {type: String, required: true, default: 'image'},
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema)

module.exports = User;