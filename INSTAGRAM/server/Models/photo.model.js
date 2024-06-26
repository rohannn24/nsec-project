import mongoose from "mongoose";

const photoSchema = mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    },
    imgDesc: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    peopleLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    peopleCommented: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model('Photo', photoSchema); 