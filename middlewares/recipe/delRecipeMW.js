/**
 * Removes a recipe from the database, the entity used here is: res.locals.recipe
 * Redirects to /recipe after delete
 */
const reqOption = require("../reqOptions").reqOption;
const deleteImage = require("../deleteFile");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository,"Recipe");
    const UserModel = reqOption(objectrepository,"User");
    try{
      const publisherId = res.locals.recipe.publisher;
      const recipeIdToDelete = res.locals.recipe._id;
      if(publisherId == res.locals._userId){
        // Find all users with the recipe ID in their savedRecipes
        const usersToUpdate = await UserModel.find({ savedRecipes: recipeIdToDelete, _id: { $ne: publisherId } });
        deleteImage(res.locals.recipe.image);
        // Remove the recipe ID from savedRecipes for each user
        const updatePromises = usersToUpdate.map(user =>
          UserModel.updateOne({ _id: user._id }, { $pull: { savedRecipes: recipeIdToDelete } })
        );

        // Execute all update operations
        await Promise.all(updatePromises);

        await RecipeModel.deleteOne({_id:recipeIdToDelete});
        await UserModel.updateOne({ _id: res.locals._userId }, { $pull: { recipes: recipeIdToDelete } });
      }
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    if(typeof req.params.userid !== 'undefined')
      return res.redirect("/recipe/" + res.locals._userId);
    else
    return res.redirect("/");
  };
};
