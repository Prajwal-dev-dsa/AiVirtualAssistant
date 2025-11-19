import uploadOnCloudinary from "../config/cloudinary.js";
import userModel from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in getCurrentUser: ${error}`);
        return res.status(500).json({ message: error.message });
    }
};

export const updateAvatar = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        const user = req.user;
        let assistantImage;
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path)
        }
        else {
            assistantImage = imageUrl
        }
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {
            assistantName,
            assistantImage
        }, {
            new: true
        }).select("-password")
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error in updateAvatar: ${error}`);
        return res.status(500).json({ message: error.message });
    }
};
