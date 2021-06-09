const express = require('express');
const Router = express.Router();
const s = require('../controllers/subject');
const auth = require('../middlewares/auth');

Router.get('/create', auth('admin'), s.RenderCreate);
Router.get('/edit/:id', auth('admin'), s.RenderEdit);
Router.get('/delete/:id', auth('admin'), s.Delete);

Router.post('/create', auth('admin'), s.Create);
Router.post('/edit', auth('admin'), s.Edit);

module.exports = Router;