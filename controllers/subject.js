const s = require('../services/subject');

const RenderAllSubjects = async (req, res) => {
    try {
        const result = await s.FetchAll();
        res.render('subjects', { subjects: result, pageTitle: 'Elece - Subjects' });
    } catch (error) {
        res.render('500');
    }
};

const RenderCreate = async (req, res) => {
    res.render('subjectCreate', { pageTitle: 'Elece - Add Subjects' });
};

const RenderEdit = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await s.FetchSubject(name);
        if (!result) {
            res.render('404', { pageTitle: '404 Not Found' });
        }
        res.render('subjectEdit', { subject: result, pageTitle: 'Elece - Edit Subject' });
    } catch (error) {
        res.render('500');
    }
};

const Create = async (req, res) => {
    try {
        const result = await s.Create(req.body);
        res.send(result);
    } catch (error) {
        res.render('500');
    }
};

const Edit = async (req, res) => {
    try {
        const result = await s.Edit(req.body);
        if (result) {
            res.redirect(`/subjects`)
        } else {
            res.render('404', { pageTitle: '404 Not Found' });
        }
    } catch (error) {
        res.render('500');
    }
};

const Delete = async (req, res) => {
    try {
        await s.Delete(req.body._id);
        res.redirect('/home');
    } catch (error) {
        res.render('500');
    }
};

module.exports = {
    Create,
    Edit,
    Delete,
    RenderAllSubjects,
    RenderCreate,
    RenderEdit,
};