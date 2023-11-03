/**
 * Load a user information with the shared recipes (if exists) with the :userid param
 * and put it on res.tpl.user
 */

const User = require("../../models/user");
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return function (req, res, next) {
    const UserModel = objectrepository["User"];
    const user = UserModel.findById(req.params.userid)
      .then((userByID) => {
        res.locals._userId = userByID._id;
        res.locals.userName = userByID.username;
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
    return next();
  };
};
