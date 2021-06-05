const express = require('express');
const Router = express.Router();
const t = require('../controllers/timetable');
const auth = require('../middlewares/auth');

Router.get('/edit/:code', auth('admin'), t.RenderTTEdit);

Router.post('/create', auth('admin'), t.Create);
Router.post('/edit', auth('admin'), t.Edit);

module.exports = Router;