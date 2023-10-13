/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};