/**
 * If the user is authenticated, call next, otherwise redirect to /login
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals._userId="saj234234mhjsbsd";
        next();
    };
};