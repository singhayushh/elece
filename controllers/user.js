const u = require('../services/user');

const RenderPeople = async(_req, res) => {
    try {
        let result = await u.FetchAllByRole('teacher');
        const teachers = result.users;
        result = await u.FetchAllByRole('student');
        const students = result.users;
        res.render('people', { teachers, students, pageTitle: 'Elece - People' });
    } catch (error) {
        res.render('500');
    }
};

const RenderProfile = async(req, res) => {
    const { email } = req.body.user;
    const result = await u.FetchUserByEmail(email);
    if (result.message == 'success') {
        res.render('profile', { user: result.user, pageTitle: `Elece | ${result.user.name}`, hideEdit: false });
    } else {
        res.render('404', { pageTitle: 'Elece | 404' });
    }
};

const RenderEdit = async(req, res) => {
    const { email } = req.body.user;
    const user = await u.FetchUserByEmail(email);
    if (user) {
        res.render('profileEdit', { user, pageTitle: 'Elece - Edit Profile' });
    } else {
        res.render('404', { pageTitle: 'Elece | 404' });
    }
};

const RenderUser = async(req, res) => {
    const { username } = req.params;
    const user = await u.FetchUserByUsername(username);
    if (user) {
        res.render('profile', { user, pageTitle: `Elece | ${user.name}`, hideEdit: true });
    } else {
        res.render('404', { pageTitle: 'Elece | 404' });
    }
};

const Verify = async (req, res) => {
    const { user_id } = req.params;
    let result = await u.Verify(user_id);
    if (result.message == 'success') {
        res.redirect('/people');
    } else {
        res.render('500');
    }
};

const Ban = async (req, res) => {
    const { user_id } = req.params;
    let result = await u.Ban(user_id);
    if (result.message == 'success') {
        res.redirect('/people');
    } else {
        res.render('500');
    }
};

const Logout = async(req, res) => {
    res.cookie(process.env.COOKIE_NAME, '', {
        maxAge: 0
    });
    res.redirect('/');
};

const Edit = async(req, res) => {
    if (req.body.interests)
    req.body.interests = req.body.interests.split(',');
    const result = await u.Edit(req.body);
    if (result.message == 'success') {
        res.redirect('/profile');
    } else {
        res.status(200).send('something went wrong');
    }
};

const Delete = async(req, res) => {
    const { user_id } = req.body;
    const result = await u.Delete(user_id);
    if (result == 'success') {
        res.redirect('/');
    } else {
        res.status(200).send('something went wrong');
    }
};

module.exports = {
    Ban,
    Edit,
    Delete,
    Logout,
    Verify,
    RenderEdit,
    RenderPeople,
    RenderProfile,
    RenderUser,
}