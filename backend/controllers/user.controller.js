export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in getCurrentUser: ${error}`);
        return res.status(500).json({ message: error.message });
    }
};