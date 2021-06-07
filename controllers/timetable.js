const t = require('../services/timetable');

const RenderTTEdit = async (req, res) => {
    const { code } = req.params;
    const tt = await t.FetchTimetable(code);
    if (tt != 'err') {
        res.render('timetableEdit', { timetable, pageTitle: 'Elece - Edit Timetable' });
    } else {
        res.status(200).send('something went wrong');
    }
};

const Create = async (req, res) => {
    console.log('hi');
    const tt = await t.Create(req.body);
    if (tt != 'err') {
        res.redirect(`/`);
    } else {
        res.status(200).send('something went wrong');
    }
};

const Edit = async (req, res) => {
    const tt = await t.Edit(req.body);
    if (tt != 'err') {
        res.redirect(`/`);
    } else {
        res.status(200).send('something went wrong');
    }
};

module.exports = {
    RenderTTEdit,
    Create,
    Edit,
};