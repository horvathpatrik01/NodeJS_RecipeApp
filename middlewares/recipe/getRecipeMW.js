/**
 * Load 1 recipe (recipeid) by the logged in user from the database
 * The result is saved to res.locals.recipe
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
