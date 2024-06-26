import userModel from "../Models/user.model.js";
import hashedPassword from "../Utils/Hashing.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookie from 'cookie-parser'

export const Register = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(403).json({ success: false, message: "Username already exists." });
        }
        const hashed = hashedPassword(req.body.password); 
        const newUser = new userModel({ ...req.body, password: hashed });
        await newUser.save();
        res.status(200).json({ success: true, message: 'User has been created successfully.' });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
export const Login = async (req, res) => {
    try {
        const user = await userModel.findOne({
            $or: [
                { mobile: req.body.id },
                { email: req.body.id },
                { username: req.body.id }
            ]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }
        const token = jwt.sign({id:user._id}, process.env.JWT);
        const { password, __v, ...others } = user._doc;
        res.cookie('token', token, {
            httpOnly: true
        }).status(200).json({ success: true, message: 'Login successful...', others, token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
export const Getdata = async (req, res) => {
    const user = await userModel.findOne({_id: req.params.id});
    const {password, ...updated} = user._doc;
    res.json({success: true, updated})
}
export const GetStory = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id }).populate('stories');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.stories);
    } catch (error) {
        console.error('Error fetching user stories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { name, tag, desc, dpImg, username } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { name, tag, desc,dpImg, username},
            { new: true }
        );
        const { password, ...others } = updatedUser._doc;
        res.status(200).json({ success: true, user: others });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
export const CheckUsername = async (req, res) => {
    try {
        const { username } = req.body; 
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(200).json({ exists: true, message: "Username already exists." });
        } else {
            return res.status(200).json({ exists: false, message: "Username is available." });
        }
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};