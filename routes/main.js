const express = require('express');
const Router = express.Router();
const m = require('../controllers/main');
const auth = require('../middlewares/auth');

Router.get('/', m.RenderHome);
Router.get('/timetable', m.RenderTT);
Router.get()