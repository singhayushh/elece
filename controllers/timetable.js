const t = require('../services/timetable');

const RenderCreate = async (_req, res) => {
    res.render('timetableCreate', { pageTitle: 'Elece - Create Schedule' });
};

const RenderEdit = async (req, res) => {
    try {
        const { class_id } = req.params;
        const tt = await t.FetchTimetable(class_id);
        if (tt) {
            res.render('timetableEdit', { timetable, pageTitle: 'Elece - Edit Timetable' });
        } else {
            res.render('404', { pageTitle: '404 not found'});
        }
    } catch (error) {
        console.log(error);
        res.render('500');
    }
};

const RenderTimetable = async (req, res) => {
    try {
        const { class_id } = req.params;
        const tt = await t.FetchTimetable(class_id);
        if (tt) {
            res.render('timetable', { timetable: tt, pageTitle: `Elece - ${tt.class}` });
        } else {
            res.render('404', { pageTitle: '404 not found'});
        }
    } catch (error) {
        console.log(error);
        res.render('500');
    }
};

const Create = async (req, res) => {
    try {
        const tt = await t.Create(req.body);
        res.redirect(`/timetable/${tt.class}`);
    } catch (error) {
        res.render('500');
    }
};

const Edit = async (req, res) => {
    try {
        const tt = await t.Edit(req.body);
        if (!tt) {
            res.render('404', { pageTitle: '404 not found'});
        } else {
            res.redirect(`/timetable/${tt.class}`);
        }
    } catch (error) {
        res.render('500');
    }
};

const Delete = async (req, res) => {
    try {
        const { id } = req.params;
        const _result = await t.Delete(id);
        res.redirect('/home');
    } catch (error) {
        res.render('500');
    }
};

module.exports = {
    RenderCreate,
    RenderEdit,
    RenderTimetable,
    Create,
    Edit,
    Delete,
};