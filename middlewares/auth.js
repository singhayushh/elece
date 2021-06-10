const jwt = require('jsonwebtoken');

const auth = (role) => {
    return async (req, res, next) => {
        try {
            const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.JWT_SECRET);

            if (role == 'admin' && decoded.role != 'admin') {
                res.redirect('/home');
            } else if (role == 'teacher' && (decoded.role != 'teacher' || decoded.role != 'admin')) {
                res.redirect('/home');
            } else {
                req.body.user = decoded;
                next();
            }
        } catch (error) {
            res.redirect('/login');
        }
    };
}

module.exports = auth;