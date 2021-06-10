const express = require('express');
const Router = express.Router();
const c = require('../controllers/class');
const auth = require('../middlewares/auth');

Router.get('/:name', auth(), c.RenderClass);
// Router.get('/join/:room', auth(), c.JoinClass);

Router.get('/', auth('admin'), c.RenderAllClasses);
Router.get('/create', auth('admin'), c.RenderCreate);
Router.get('/edit/:name', auth('admin'), c.RenderEdit);
Router.get('/delete/:id', auth('admin'), c.Delete);

Router.post('/create', auth('admin'), c.Create);
Router.post('/edit', auth('admin'), c.Edit);

module.exports = Router;