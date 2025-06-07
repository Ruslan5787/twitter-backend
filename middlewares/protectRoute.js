import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies);
        const token = req.cookies.jwt;

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({message: "Unauthorized"});
        }

        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log('User not found for ID:', decoded.userId);
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Error in protectRoute:', err);
        return res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
};

export default protectRoute;
