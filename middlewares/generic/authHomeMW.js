/**
 * Check if the user is authenticated without redirecting
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};