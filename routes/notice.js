const express = require('express');
const Router = express.Router();
const n = require('../controllers/notice');
const auth = require('../middlewares/auth');

Router.get('/create', auth('admin'), n.RenderCreate);
Router.get('/:path', auth(), n.RenderNotice)
Router.get('/edit/:path', auth('admin'), n.RenderEdit)

Router.post('/create', auth('admin'), n.Create);
Router.post('/edit', auth('admin'), n.Edit);
Router.post('/delete', auth('admin'), n.Delete);

module.exports = Router;