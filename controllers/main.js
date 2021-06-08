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

const RenderHome = async (_req, res) => {
    
    let today = (new Date()).getDay();
    const tt = await FetchTimetable('class-4');
    let data=[];
    if (tt && tt.schedule && tt.schedule.hasOwnProperty(today)){
        data = tt.schedule[today].data;
    }
    res.render('home', { timetable: data, pageTitle: 'Elece' });

};

const RenderLogin = async (_req, res) => {
    res.render('login', {url: AuthURL(), pageTitle: 'Elece - Join' });
};

const RenderNotices = async (_req, res) => {
    let notices = await n.FetchAll();
    res.render('notices', { notices, pageTitle: 'Elece - Notices' });
};

const RenderPeople = async (_req, res) => {
    let users = await u.FetchAll();
    res.render('people', { users, pageTitle: 'Elece - People' });
};

const RenderTT = async (_req, res) => {
    const tt = await FetchTimetable('class-4');
    ttschedule=tt?tt.schedule:[];
    res.render('timetable', { timetable: ttschedule, pageTitle: 'Elece - Timetable' });
};

const Login = async (req, res) => {
    let result = await u.Create(req.body);
    
    if (result == 'banned') {
        res.redirect('/?status=banned');
    }

    req.body.user.user_id = result._id;

    const token = jwt.sign(req.body.user, process.env.JWT_SECRET);
    res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: 100*60*60*1000,
        httpOnly: true,
        secure: false,
    });

    if (!result.dob) {
        res.redirect('/profile/edit?status=welcome');
    } else {
        res.redirect('/profile');   
    }
};

module.exports = {
    RenderHome,
    RenderLogin,
    RenderNotices,
    RenderPeople,
    RenderTT,
    Login,
};
