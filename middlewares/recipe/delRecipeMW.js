/**
 * Removes a recipe from the database, the entity used here is: res.locals.recipe
 * Redirects to /recipe after delete
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return res.redirect("/recipe/1");
  };
};
