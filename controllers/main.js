const root_url = process.env.ROOT_URL;
const querystring = require('querystring');

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
    res.render('home', {});
};

const RenderLogin = async (_req, res) => {
    res.render('login', {url: AuthURL()});
};

const RenderNotices = async (_req, res) => {
    res.render('notices', {});
};

const RenderPeople = async (_req, res) => {
    res.render('people', {});
};

const RenderTT = async (_req, res) => {
    res.render('timetable', {});
};

const Login = async (_req, res) => {
    res.render('home');
};

module.exports = {
    RenderHome,
    RenderLogin,
    RenderNotices,
    RenderPeople,
    RenderTT,
    Login,
};