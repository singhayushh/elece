const express = require('express');
const Router = express.Router();
const t = require('../controllers/timetable');
const auth = require('../middlewares/auth');

Router.get('/create', auth('teacher'), t.RenderCreate);
Router.get('/edit/:class_id', auth('teacher'), t.RenderEdit);
Router.get('/delete/:id', auth('teacher'), t.Delete);
Router.get('/:class_id', auth('teacher'), t.RenderTimetable);

Router.post('/create', auth('teacher'), t.Create);
Router.post('/edit', auth('teacher'), t.Edit);

module.exports = Router;