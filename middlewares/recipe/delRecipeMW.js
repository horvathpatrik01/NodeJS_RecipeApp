/**
 * Removes a recipe from the database, the entity used here is: res.locals.recipe
 * Redirects to /recipe after delete
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};