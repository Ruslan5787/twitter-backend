import School from "../models/schoolModel.js";
import Group from "../models/groupsModel.js";

const createSchool = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const {title, email, inn} = req.body;
        const school = await School.findOne({title});

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
        console.log("Error in createSchool: ", err.message);
    }
};

const getGroups = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const groups = await Group.find({teacherId: teacherId.toString()});

        if (!groups || groups.length === 0) {
            return res.status(200).json([]); // Возвращаем пустой массив вместо 404
        }

        return res.status(200).json(groups);
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера", details: error.message});
    }
};

const createGroup = async (req, res) => {
    try {
        const {title, schoolId} = req.body;
        if (!title.trim()) {
            return res.status(400).json({error: "Заполните название группы"});
        }

        const existingGroup = await Group.findOne({title, schoolId});
        if (existingGroup) {
            return res.status(400).json({error: "Такая группа уже существует"});
        }

        const newGroup = new Group({
            title,
            teacherId: req.user._id,
            schoolId,
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(500).json({error: "Ошибка сервера", details: err.message});
    }
};

const getGroupUsers = async (req, res) => {
    try {
        const groupId = req.params.id; // Исправлено: id вместо groupId
        console.log(await Group.findById(groupId))
        const group = await Group.findById(groupId).populate("users");

        if (!group) {
            return res.status(404).json({message: "Группа не найдена"});
        }

        return res.status(200).json(group.users || []);
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера", details: error.message});
    }
};

const getSchool = async (req, res) => {
    try {
        const schoolId = req.params.id;
        const school = await School.findById(schoolId);

        if (!school) {
            return res.status(404).json({error: "Такой школы не существует в системе"});
        }

        return res.status(200).json(school);
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера", details: error.message});
    }
};

const getSchools = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const schools = await School.find({teachers: teacherId.toString()});

        return res.status(200).json(schools);
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера", details: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const teacherId = req.user._id;

        // Проверяем, существует ли пользователь
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: "Пользователь не найден"});
        }

        // Проверяем, что пользователь является учеником
        if (user.role !== "student") {
            return res.status(403).json({error: "Можно удалять только учеников"});
        }

        // Проверяем, что учитель имеет доступ к группе, в которой состоит пользователь
        const group = await Group.findOne({
            users: userId,
            teacherId: teacherId.toString()
        });

        if (!group) {
            return res.status(403).json({error: "У вас нет прав для удаления этого пользователя"});
        }

        // Удаляем пользователя из группы
        await Group.updateOne(
            {_id: group._id},
            {$pull: {users: userId}}
        );

        // Удаляем пользователя
        await User.findByIdAndDelete(userId);

        return res.status(200).json({message: "Пользователь успешно удален"});
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера", details: error.message});
    }
};

// ... (остальные функции остаются без изменений)

export {createSchool, createGroup, getSchools, getSchool, getGroups, getGroupUsers, deleteUser};