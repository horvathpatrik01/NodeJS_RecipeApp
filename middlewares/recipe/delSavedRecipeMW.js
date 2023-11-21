/**
 * Removes a saved recipe for the logged in user only from the database, the entity used here is: res.locals.savedrecipe
 * Renders te current page if the original recipe is not yet deleted, otherwise redirects to /recipe/saved
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const UserModel = reqOption(objectrepository,"User");
    try{
      await UserModel.updateOne({ _id: res.locals._userId }, { $pull: { savedRecipes: req.params.recipeid } });
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    return res.redirect("/recipe/saved/" + res.locals._userId);
  };
};
