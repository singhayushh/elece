const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const c = require('../services/class');
const n = require('../services/notice');
const u = require('../services/user');
const { FetchTimetable } = require('../services/timetable');

const root_url = process.env.ROOT_URL;

const AuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${root_url}/auth/google`,
        client_id: process.env.CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
};

// Static Page about the website
const RenderIndex = async(req, res) => {
    let authorized = false;
    if (req.body.user) authorized = true;
    res.render('index', { pageTitle: 'Elece', authorized });
};

// About the website
const RenderAbout = async(req, res) => {
    let authorized = false;
    if (req.body.user) authorized = true;
    res.render('about', { pageTitle: 'Elece - About', authorized });
};

// Dev Team Promo
const RenderTeam = async(req, res) => {
    let authorized = false;
    if (req.body.user) authorized = true;
    res.render('team', { pageTitle: 'Elece - Team', authorized });
};

// Dashboard - classes today + card nav
const RenderHome = async(req, res) => {
    const defaultClass = req.body.user.defaultClass;

    let today = (new Date()).getDay();
    let tt;

    tt = await FetchTimetable(defaultClass);

    let data = [];
    if (tt && tt.schedule) {
        data = tt.schedule.length > today ? tt.schedule[today] : [];
    }

    res.render('home', { timetable: data, pageTitle: 'Elece' });
};

// Google OAuth Login page
const RenderLogin = async(_req, res) => {
    res.render('login', { url: AuthURL(), pageTitle: 'Elece - Join' });
};

// For Global School Notices
const RenderNotices = async(_req, res) => {
    let notices = await n.FetchAll();
    res.render('notices', { notices, pageTitle: 'Elece - Notices' });
};

// Authorized user's time table
const RenderTT = async(req, res) => {
    const { defaultClass } = req.body.user;
    const tt = await FetchTimetable(defaultClass);
    ttschedule = tt ? tt.schedule : [];
    res.render('timetable', { timetable: ttschedule.periods, pageTitle: 'Elece - Timetable' });
};

const RenderTeachers = async (_req, res) => {
    const teachers = await u.FetchAllByRole('teacher');
    if (teachers.length)
        res.render('teachers', { teachers, pageTitle: 'Elece - Teachers' });
    else 
        res.render('404', { pageTitle: '404 not found' });
};

const RenderStudents = async (req, res) => {
    const { class_id } = req.params;
    const students = await u.FetchAllByClass(class_id);
    if (students.users.length)
        res.render('students', { students: students.users, pageTitle: 'Elece - Teachers' });
    else 
        res.render('404', { pageTitle: '404 not found' });
};

// Handle Google OAuth redirect
const Login = async(req, res) => {
    if (req.body.email && req.body.name && req.body.picture ) {
        req.body.user = { 
            email: req.body.email, 
            name: req.body.name, 
            picture: req.body.picture, 
        };
    }
    let result = await u.Create(req.body);

    if (result.message == 'new') {
        req.body.user.username = req.body.user.email.substring(0, req.body.user.email.indexOf("@"));
        const classes = await c.FetchAll();
        res.render('profileCreate', { user: req.body.user, classes, pageTitle: 'Elece - Create Account' });
    } else if (result.message != 'success') {
        res.redirect('/?status=unverified');
    } else {
        req.body.user.user_id = result.user._id;
        req.body.user.role = result.user.role;
        req.body.user.defaultClass = result.user.defaultClass;

        const token = jwt.sign(req.body.user, process.env.JWT_SECRET);
        res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
        });

        res.redirect('/home');
    }
};

module.exports = {
    Login,
    RenderIndex,
    RenderAbout,
    RenderTeam,
    RenderHome,
    RenderLogin,
    RenderNotices,
    RenderStudents,
    RenderTeachers,
    RenderTT,
};