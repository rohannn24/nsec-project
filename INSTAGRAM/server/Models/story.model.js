import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    storyImg: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Story', storySchema);
