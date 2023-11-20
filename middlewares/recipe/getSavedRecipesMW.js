const Recipe = require("../../models/recipe");

/**
 * Load all saved recipes by the logged in user from the database
 * The result is saved to res.locals.savedrecipes
 */
const reqOption = require("../reqOptions").reqOption;
const dateFormat = require("../formatDate");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository, "Recipe");
    const UserModel = reqOption(objectrepository,"User");
    let user=res.locals.user;
    try{
      if(typeof user.savedRecipes !=='undefined' && user.savedRecipes.length>0){
        res.locals.savedRecipes =[];
        const fetchRecipeDetails = async (recipeId) => {
          const recipe = await RecipeModel.findById(recipeId).exec();
          if (recipe) {
            const user = await UserModel.findById(recipe.publisher).exec();
            return {
              _id: recipe._id,
              name: recipe.name,
              text: recipe.description,
              image: recipe.image,
              published: dateFormat(recipe.published),
              publishedBy:user.username,
            };
          }
          return null;
        };
        
        const recipeDetailsArray = await Promise.all(user.savedRecipes.map(fetchRecipeDetails));
        
        // Filter out null values (recipes not found)
        res.locals.savedRecipes = recipeDetailsArray.filter(recipe => recipe !== null);
      }
    }catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
    return next();
  };
};
