const Timetable = require("../models/timetable");

const Create = async (ttBody) => {
    try {
        const tt = await Timetable.create(ttBody);
        return tt;        
    } catch (error) {
        return error.message;
    }
};

const Edit = async (ttBody) => {
    try {
        const tt = Timetable.findOneAndUpdate({ code: ttBody.code }, { schedule: ttBody.schedule });
        return tt;
    } catch (error) {
        return error.message;
    }
};

const FetchTimetable = async (code) => {
    try {
        const tt = await Timetable.findOne({ code });
        return tt;
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    Create,
    Edit,
    FetchTimetable
};