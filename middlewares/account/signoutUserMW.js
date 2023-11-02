/**
 * Logs out the currently logged in user.
 * Redirects to the home page /
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.destroy(err => {
            return res.redirect('/');
        });
    };
};