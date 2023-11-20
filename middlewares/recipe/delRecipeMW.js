/**
 * Removes a recipe from the database, the entity used here is: res.locals.recipe
 * Redirects to /recipe after delete
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository,"Recipe");
    const UserModel = reqOption(objectrepository,"User");
    try{
      if(res.locals.recipe.publisher === res.locals._userid){
        await RecipeModel.deleteOne({_id:res.locals.recipe._id});
        await UserModel.updateOne({ _id: res.locals._userid }, { $pull: { recipes: req.params.recipeid } });
      }
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    if(typeof req.params.userid !== 'undefined')
      return res.redirect("/recipe/" + res.locals._userid);
    else
    return res.redirect("/");
  };
};
