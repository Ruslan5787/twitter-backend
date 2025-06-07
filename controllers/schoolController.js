import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import {v2 as cloudinary} from "cloudinary";
import mongoose from "mongoose";
import sendWelcomeEmail from "../utils/mailer.js";
import School from "../models/schoolModel.js"

const createSchool = async (req, res) => {
    try {
        const {title, email, inn } = req.body;
        const school = await School.findOne({title});

        if (school) {
            return res.status(400).json({error: "Школа уже существует в системе"});
        }
        const newSchool = new School({
            title,
            email,
            email,
            inn,
        });

        await newSchool.save();

        if (newSchool) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
                role: newUser.role,
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in signupUser: ", err.message);
    }
};

export {createSchool};