const Timetable = require("../models/timetable");

const Create = async (ttBody) => {
    try {
        return await Timetable.create(ttBody);    
    } catch (error) {
        throw error;
    }
};

const Edit = async (ttBody) => {
    try {
        return await Timetable.findOneAndUpdate({ class: ttBody.class }, { schedule: ttBody.schedule });
    } catch (error) {
        throw error;
    }
};

const Delete = async (_id) => {
    try {
        return await Timetable.deleteOne({ _id });
    } catch (error) {
        throw error;
    }
};

const FetchTimetable = async (class_id) => {
    try {
        const result = await Timetable.findOne({ class: class_id }).populate({ path: 'class', select: 'name' }).populate({
            path: 'schedule.periods.subject',
            select: 'name'
        }).populate({
            path: 'schedule.periods.teacher',
            select: 'name username picture'
        });

        return result;
    } catch (error) {
        throw error;
    }
};

const FetchAll = async () => {
    try {
        return await Timetable.find().populate({ path: 'class', select: 'name' });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    Create,
    Edit,
    Delete,
    FetchAll,
    FetchTimetable
};