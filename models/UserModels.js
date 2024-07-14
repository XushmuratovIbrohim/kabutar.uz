import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber: {type: String, require: true, unique: true},
    subscribeds: [{id: Number}],
    passwordHash: {type: String, min: 3, max: 12},
    username: {type: String, min: 3, require: true},
    subscribers: [{id: Number}]
}, {timestamps: true})

export const UserModel = mongoose.model('user', UserSchema)