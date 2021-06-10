const Class = require("../models/class");

const Create = async (classBody) => {
    try {
        return await Class.create(classBody);    
    } catch (error) {
        throw error;
    }
};

const Edit = async (classBody) => {
    try {
        const _class = await Class.findOne({ name: classBody.name });
        if (classBody.subjects) _class.subjects = classBody.subjects;
        if (classBody.teacher) _class.teacher = classBody.teacher;
        return await _class.save();
    } catch (error) {
        throw error;
    }
};

const Delete = async (_id) => {
    try {
        return await Class.deleteOne({ _id });
    } catch (error) {
        throw error;
    }
}

const FetchClass = async (name) => {
    try {
        return await Class.findOne({ name }).populate({ path: 'subjects', select: 'name' }).populate({ path: 'teacher', select: 'name username picture' });
    } catch (error) {
        throw error;
    }
};

const FetchClassByID = async (_id) => {
    try {
        return await Class.findOne({ _id }).populate({ path: 'subjects', select: 'name' }).populate({ path: 'teacher', select: 'name username picture' });
    } catch (error) {
        throw error;
    }
};

const FetchAll = async () => {
    try {
        return await Class.find().populate({ path: 'teacher', select: 'name username picture' });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    Create,
    Edit,
    Delete,
    FetchAll,
    FetchClass,
    FetchClassByID,
};