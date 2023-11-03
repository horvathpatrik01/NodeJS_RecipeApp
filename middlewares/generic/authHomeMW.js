/**
 * Check if the user is authenticated without redirecting
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.session.belepve !== "undefined" &&
      req.session.belepve === true
    ) {
      res.locals.isAuthenticated = true;
      res.locals._userId = req.session._userid;
    } else {
      res.locals.isAuthenticated = false;
    }
    return next();
  };
};
