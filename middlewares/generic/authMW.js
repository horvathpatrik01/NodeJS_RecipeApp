/**
 * If the user is authenticated, call next, otherwise redirect to /login
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.session.belepve === "undefined" ||
      req.session.belepve !== true
    ) {
      return res.redirect("/login");
    }
    res.locals.isAuthenticated = true;
    res.locals._userId = req.session._userid;
    req.session.cookie.maxAge = 180000;
    return next();
  };
};
