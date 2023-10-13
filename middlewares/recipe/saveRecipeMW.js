/**
 * Using POST params update or save a recipe to the database
 * If res.locals.recipe is there, it's an update otherwise this middleware creates an entity
 * Redirects to /recipe after success
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};