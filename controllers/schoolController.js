import mongoose from "mongoose";
import sendWelcomeEmail from "../utils/mailer.js";
import School from "../models/schoolModel.js"
import Group from "../models/groupsModel.js";

const createSchool = async (req, res) => {
    try {
        console.log(req.body)
        const teacherId = req.user._id;
        const {title, email, inn} = req.body;
        const school = await School.findOne({title: title});
        console.log(title)
        if (school) {
            return res.status(400).json({error: "Школа уже существует в системе"});
        }
        const newSchool = new School({
            title,
            email,
            inn,
        });

        newSchool.teachers.push(teacherId);

        await newSchool.save();

        res.status(201).json(newSchool);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in signupUser: ", err.message);
    }
};

const getGroups = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const groups = await Group.find({teacherId: teacherId.toString()})

        if (groups === null) {
            return res.status(404).json("Пока групп нет")
        }

        return res.status(200).json(groups)
    } catch (error) {
        return res.status(500).json({error: 'Ошибка сервера', details: error.message});
    }
}

const createGroup = async (req, res) => {
    try {
        const {title, schoolId} = req.body;
        console.log(title, schoolId)
        if (title.trim() === "") {
            res.status(400).json({error: "Заполните название группы"});
        }

        const group = Group.findOne({title})

        if (!group) {
            res.status(400).json({error: "Такая группа уже существует"});
        }

        const newGroup = new Group({
            title,
            teacherId: req.user._id,
            schoolId: schoolId,
        })

        newGroup.save();

        res.status(201).json(newGroup)
    } catch (err) {
    }
}

const getSchool = async (req, res) => {
    try {
        const schoolId = req.params.id;

        const school = await School.findById(schoolId)

        if (school === null) {
            return res.status(404).json("Такой школы не существует в системе")
        }

        return res.status(200).json(school)
    } catch (error) {
        return res.status(500).json({error: 'Ошибка сервера', details: error.message});
    }
}

const getSchools = async (req, res) => {
    try {
        const teacherId = req.user._id;

        const schools = await School.find({teachers: teacherId.toString()})

        return res.status(200).json(schools)
    } catch (error) {
        return res.status(500).json({error: 'Ошибка сервера', details: error.message});
    }
}

export {createSchool, createGroup, getSchools, getSchool, getGroups};