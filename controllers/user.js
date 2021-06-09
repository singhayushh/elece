const u = require('../services/user');

const RenderProfile = async(req, res) => {
    const { email } = req.body.user;
    const user = await u.FetchUserByEmail(email);
    if (user) {
        res.render('profile', { user, pageTitle: `Elece | ${user.name}`, hideEdit: false });
    } else {
        res.render('404', { pageTitle: 'Elece | 404' });
    }
};

const RenderEdit = async(req, res) => {
    const { email } = req.body.user;
    const user = await u.FetchUserByEmail(email);
    if (user) {
        res.render('editProfile', { user, pageTitle: 'Elece - Edit Profile' });
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


const Logout = async(req, res) => {
    res.cookie(process.env.COOKIE_NAME, '', {
        maxAge: 0
    });
    res.redirect('/');
};

const Edit = async(req, res) => {
    req.body.interests = req.body.interests.split(',');
    const result = await u.Edit(req.body);
    if (result == 'success') {
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
    RenderProfile,
    RenderEdit,
    RenderUser,
    Logout,
    Edit,
    Delete,
}