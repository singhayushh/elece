const querystring = require('querystring');
const jwt = require('jsonwebtoken');

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
        data = tt.schedule.length > today ? tt.schedule[today].data : [];
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

// Admin - view teachers and students
const RenderPeople = async(_req, res) => {
    let users = await u.FetchAll();
    res.render('people', { users, pageTitle: 'Elece - People' });
};

// Authorized user's time table
const RenderTT = async(_req, res) => {
    const tt = await FetchTimetable('class-4');
    ttschedule = tt ? tt.schedule : [];
    res.render('timetable', { timetable: ttschedule, pageTitle: 'Elece - Timetable' });
};

// Handle Google OAuth redirect
const Login = async(req, res) => {
    let result = await u.Create(req.body);

    if (result.message == 'new') {
        res.render('createAccount', { user: req.body.user });
    } else if (result.message != 'verified') {
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
    RenderPeople,
    RenderTT,
};