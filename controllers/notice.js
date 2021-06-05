const n = require('../services/notice');

const RenderNotice = async (req, res) => {
    const { path } = req.params;
    const notice = await n.FetchNoticeByPath(path);
    if (notice != 'err') {
        res.render('notice', { notice });
    } else {
        res.status(200).send('something went wrong');
    }
};

const RenderEditNotice = async (req, res) => {
    const { path } = req.params;
    const notice = await n.FetchNoticeByPath(path);
    if (notice != 'err') {
        res.render('noticeEdit', { notice });
    } else {
        res.status(200).send('something went wrong');
    }
};

const Create = async (req, res) => {
    const notice = await n.Create(req.body);
    if (notice != 'err') {
        res.redirect(`/notice/${notice.path}`);
    } else {
        res.status(200).send('something went wrong');
    }
};

const Edit = async (req, res) => {
    const notice = await n.Edit(req.body);
    if (notice != 'err') {
        res.redirect(`/notice/${notice.path}`);
    } else {
        res.status(200).send('something went wrong');
    }
};

const Delete = async (req, res) => {
    const result = n.Delete(req.body._id);
    if (result == 'success') {
        res.redirect('/');
    } else {
        res.status(200).send('something went wrong');
    }
};

module.exports = {
    RenderNotice,
    RenderEditNotice,
    Create,
    Edit,
    Delete,
};