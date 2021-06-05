const jwt = require('jsonwebtoken');

const auth = (role) => {
    return async (req, res, next) => {
        try {
            const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.JWT_SECRET);

            if (role == 'admin') {
                if (!decoded.isAdmin) {
                    // Not admin
                    res.redirect('index?status=1');
                }
            }
            req.body.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            res.redirect('index?status=0');
        }
    };
}

module.exports = auth;