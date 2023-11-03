/**
 * Load 1 saved recipe (recipeid) by the logged in user from the database
 * The result is saved to res.locals.savedrecipe
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
