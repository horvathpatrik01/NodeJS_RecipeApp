/**
 * Find all recipes in the database, which contains the query string in their name
 * The result is saved to res.locals.foundrecipes
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
