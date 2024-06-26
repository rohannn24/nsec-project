import storyModel from '../Models/story.model.js'
import userModel from '../Models/user.model.js';

export const Addstory = async (req, res) => {
    console.log('hit')
    console.log(req.body);
    const { storyImg, userId } = req.body;
    if (!storyImg || !userId) {
        res.status(400);
        throw new Error('Story image and user ID are required');
    }
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

    const newStory = new storyModel({
        storyImg,
        userId,
        createdAt, 
        expiresAt
    });
    await newStory.save();
    const user = await userModel.findOne({_id: userId})
    user.stories.push(newStory._id);
    await user.save(); 

    res.status(201).json(newStory);
};
