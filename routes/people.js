const express = require('express');
const Router = express.Router();
const u = require('../controllers/user');
const auth = require('../middlewares/auth');

Router.get('/', auth('admin'), u.RenderPeople);
Router.get('/ban/:user_id', auth('teacher'), u.Ban);
Router.get('/delete/:user_id', auth('teacher'), u.Delete);
Router.get('/verify/:user_id', auth('teacher'), u.Verify);

module.exports = Router;