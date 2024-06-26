import photoModel from '../Models/photo.model.js'
import userModel from '../Models/user.model.js'

export const AddPhoto = async (req, res) => {
    console.log('hit')
    try {
        const tagsArray = req.body.tags.split(',').map(tag => tag.trim());
        const newPhoto = new photoModel({
            imgUrl: req.body.imageUrl,
            tags: tagsArray,
            imgDesc: req.body.description
        });
        await newPhoto.save();
        const user = await userModel.findOne({_id: req.body.id})
        user.posts.push(newPhoto._id);
        await user.save(); 
        res.status(200).json({ success: true, message: "Photo has been updated...", ...newPhoto._doc });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add photo.", error: error.message });
    }
}


export const AddLike = async (req, res) => {
    try {
        const { picId, userId } = req.body;
        const photo = await photoModel.findById(picId);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        if (!photo.peopleLiked.includes(userId)) {
            photo.peopleLiked.push(userId);
            await photo.save();
            return res.status(200).json({ message: 'Like added successfully' });
        } else {
            photo.peopleLiked.pop(userId);
            await photo.save();
            return res.status(400).json({ message: 'Like removed successfully...' });
        }
    } catch (error) {
        console.error('Error adding like:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const Getpost = async (req, res) => {
    try {
        const userId = req.params.id; // Use req.params.id to get the user ID from the URL parameters
        const user = await userModel.findById(userId).populate('posts'); // Populate the posts field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.posts); // Return the populated posts
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};