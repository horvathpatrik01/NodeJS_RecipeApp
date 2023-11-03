/**
 * Copies the selected recipe to a saved recipe in the database, so the user can see it,
 * even after the original recipe has been deleted.
 * Renders the current recipedetails page
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
