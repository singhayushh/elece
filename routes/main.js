const express = require('express');
const Router = express.Router();
const m = require('../controllers/main');
const auth = require('../middlewares/auth');
const googleAuth = require('../middlewares/google');

Router.get('/', m.RenderIndex);
Router.get('/about', m.RenderAbout);
Router.get('/team', m.RenderTeam);

Router.get('/auth/google', googleAuth, m.Login);
Router.get('/login', m.RenderLogin);

Router.get('/home', auth(), m.RenderHome);
Router.get('/notices', auth(), m.RenderNotices);
Router.get('/schedule', auth(), m.RenderTT);
Router.get('/classroom', auth(), m.RenderClass);

Router.get('/people', auth('admin'), m.RenderPeople);

module.exports = Router;