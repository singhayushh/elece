const express = require('express');
const Router = express.Router();
const u = require('../controllers/user');
const auth = require('../middlewares/auth');

Router.get('/', auth(), u.RenderProfile);
Router.get('/edit', auth(), u.RenderEdit);
Router.get('/:username', auth(), u.RenderUser);

Router.get('/logout', auth(), u.Logout);

Router.post('/edit', auth(), u.Edit);
Router.post('/delete', auth('admin'), u.Delete);