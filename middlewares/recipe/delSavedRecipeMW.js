/**
 * Removes a saved recipe for the logged in user only from the database, the entity used here is: res.locals.savedrecipe
 * Renders te current page if the original recipe is not yet deleted, otherwise redirects to /recipe/saved
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
