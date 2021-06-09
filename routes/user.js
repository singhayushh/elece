const express = require('express');
const Router = express.Router();
const u = require('../controllers/user');
const auth = require('../middlewares/auth');

Router.get('/', auth(), u.RenderProfile);
Router.get('/edit', auth(), u.RenderEdit);
Router.get('/:username', auth(), u.RenderUser);

Router.get('/logout', auth(), u.Logout);
Router.get('/verify/:user_id', auth('teacher'), u.Verify);
Router.get('/ban/:user_id', auth('teacher'), u.Ban);
Router.get('/delete/:user_id', auth('teacher'), u.Delete);

Router.post('/edit', auth(), u.Edit);

module.exports = Router;