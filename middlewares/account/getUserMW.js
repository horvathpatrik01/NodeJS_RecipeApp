/**
 * Load a user information with the shared recipes (if exists) with the :userid param
 * and put it on res.tpl.user
 */

const User = require("../../models/user");

module.exports = function (objectrepository) {
  return async function (req, res, next) {
    var UserModel = objectrepository["User"];
    const user = await UserModel.findById(req.session._userId)
      .then((userByID) => {
        res.locals.user = userByID;
      })
      .cath(console.error);
    return next();
  };
};
