/**
 * Load a user information with the shared recipes (if exists) with the :userid param
 * and put it on res.tpl.user
 */

const User = require("../../models/user");
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    try{
      const UserModel = objectrepository["User"];
      const userById = await UserModel.findById(req.params.userid).exec();
      res.locals.user=userById;
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    return next();
  };
};
