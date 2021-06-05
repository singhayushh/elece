const Notice = require("../models/notice");

const Create = async (noticeBody) => {
    try {
        let notice;
        notice = await Notice.findOne({ path: noticeBody.path });
        if (!notice) {
            notice = new Notice({
                path: noticeBody.path,
                title: noticeBody.title,
                short: noticeBody.short,
                long: noticeBody.long,
                addedBy: noticeBody.user_id,
            });
            await notice.save();
        }
        return notice;
    } catch (error) {
        return error.message;
    }
};

const Edit = async (noticeBody) => {
    try {
        let notice = await Notice.findOneAndUpdate({ _id: noticeBody._id }, { noticeBody });
        return notice;
    } catch (error) {
        return error.message;
    }
};

const Delete = async (_id) => {
    try {
        await Notice.deleteOne({ _id });
        return 'success';
    } catch (error) {
        return error.message;
    }
};

const FetchAll = async () => {
    try {
        const notices = await Notice.find().populate({
            path: 'addedBy',
            select: 'name picture username',
        }).sort({ 'updatedAt': -1 });
        return notices;
    } catch (error) {
        return error.message;
    }
};

const FetchNoticeByPath = async (path) => {
    try {
        const notice = await Notice.findOne({ path }).populate({
            path: 'addedBy',
            select: 'name picture username',
        });
        return notice;
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    Create,
    Edit,
    Delete,
    FetchAll,
    FetchNoticeByPath
}