/**
 * Load all saved recipes by the logged in user from the database
 * The result is saved to res.locals.savedrecipes
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
