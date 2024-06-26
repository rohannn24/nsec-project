import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tag: String,
    desc: String,
    dpImg: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
    }]
})

export default mongoose.model('User', userSchema);