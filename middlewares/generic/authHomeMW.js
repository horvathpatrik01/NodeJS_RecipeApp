/**
 * Check if the user is authenticated without redirecting
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals._userId="saj234234mhjsbsd";
        next();
    };
};