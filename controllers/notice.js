const n = require('../services/notice');

const RenderCreate = async (req, res) => {
    res.render('noticeCreate', { pageTitle: 'Elece - Create Notice'});
};

const RenderNotice = async (req, res) => {
    const { path } = req.params;
    const notice = await n.FetchNoticeByPath(path);
    if (notice != 'err') {
        res.render('notice', { notice, pageTitle: 'Elece - Notice' });
    } else {
        res.status(200).send('something went wrong');
    }
};

const RenderEdit = async (req, res) => {
    const { path } = req.params;
    const notice = await n.FetchNoticeByPath(path);
    if (notice != 'err') {
        res.render('noticeEdit', { notice, pageTitle: 'Elece - Edit Notice' });
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
    const result = await n.Delete(req.body._id);
    if (result == 'success') {
        res.redirect('/');
    } else {
        res.status(200).send('something went wrong');
    }
};

module.exports = {
    RenderCreate,
    RenderEdit,
    RenderNotice,
    Create,
    Edit,
    Delete,
};