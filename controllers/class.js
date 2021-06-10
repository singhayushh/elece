const c = require('../services/class');
const t = require('../services/timetable');

const Create = async (req, res) => {
    try {
        const result = await c.Create(req.body);
        res.redirect(`/class/${result.name}`);
    } catch (error) {
        res.render('500');
    }
};

const Edit = async (req, res) => {
    try {
        const result = await c.Edit(req.body);
        if (result) {
            res.redirect(`/class/${result.name}`)
        } else {
            res.render('404', { pageTitle: '404 Not Found' });
        }
    } catch (error) {
        res.render('500');
    }
};

const Delete = async (req, res) => {
    try {
        await c.Delete(req.body._id);
        res.redirect('/home');
    } catch (error) {
        res.render('500');
    }
};

const Join = async (req, res) => {
    const { user_id, role, defaultClass } = req.body.user;
    const { room } = req.body.params;
    // range, room, subject, teacher
    let fetchedClass = await t.FetchClassByRoom(room);
    if (role == 'teacher') {
        if (fetchedClass.teacher == user_id || defaultClass == fetchedClass._id) {
            // Allow the teacher
        } else {
            // Disallow the teacher
        }
    } else if (role == 'student') {
        if (fetchedClass._id == defaultClass) {
            // Allow the student
        } else {
            // Disallow the student
        }
    } else if (role == 'admin') {
        // Allow
    }
}

const RenderClass = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await c.FetchClass(name);
        const timetable = await t.FetchTimetable(result._id);
        if (req.body.user.defaultClass != result._id && req.body.user.role == 'student') {
            res.redirect('/home');
        }
        res.render('class', { _class: result, timetable: timetable.schedule, pageTitle: 'Elece - Classroom' });
    } catch (error) {
	console.log(error);
        res.render('500');
    }
};

const RenderCreate = async (req, res) => {
    res.render('classCreate', { pageTitle: 'Elece - Create Classroom' });
};

const RenderEdit = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await c.FetchClass(name);
        if (!result) {
            res.render('404', { pageTitle: '404 Not Found' });
        }
        res.render('classEdit', { class: result, pageTitle: 'Elece - Edit Class' });
    } catch (error) {
        res.render('500');
    }
};

const RenderAllClasses = async (req, res) => {
    try {
        const result = await c.FetchAll();
        res.render('classes', { classes: result, pageTitle: 'Elece - Classes' });
    } catch (error) {
        res.render('500');
    }
};

module.exports = {
    Create,
    Edit,
    Delete,
    RenderAllClasses,
    RenderClass,
    RenderCreate,
    RenderEdit,
};
