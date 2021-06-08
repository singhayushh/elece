const express = require('express');
const Router = express.Router();
const m = require('../controllers/main');
const auth = require('../middlewares/auth');
const googleAuth = require('../middlewares/google');

Router.get('/auth/google', googleAuth, m.Login);

Router.get('/', m.RenderHome);
Router.get('/login', m.RenderLogin);
Router.get('/notices', m.RenderNotices);
Router.get('/people', auth(), m.RenderPeople);
Router.get('/schedule', m.RenderTT);
Router.get('/classroom', auth(), m.RenderClass);

module.exports = Router;