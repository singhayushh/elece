const Subject = require("../models/subject");

const Create = async (subjectBody) => {
    try {
        return await Subject.create(subjectBody);    
    } catch (error) {
        throw error;
    }
};

const Edit = async (subjectBody) => {
    try {
        return await Subject.findOneAndUpdate({ _id: subjectBody._id }, { name: subjectBody.name });
    } catch (error) {
        throw error;
    }
};

const Delete = async (_id) => {
    try {
        return await Subject.deleteOne({ _id });
    } catch (error) {
        throw error;
    }
}

const FetchAll = async () => {
    try {
        return await Subject.find();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    Create,
    Edit,
    Delete,
    FetchAll,
};