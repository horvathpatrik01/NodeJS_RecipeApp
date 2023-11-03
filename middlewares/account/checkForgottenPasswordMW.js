/**
 * Check if the email address is already registered, if it is,
 *  generate new password (no extra checks on password)
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    next();
  };
};
