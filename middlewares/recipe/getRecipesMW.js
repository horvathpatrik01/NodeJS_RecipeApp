/**
 * Load all shared recipes by the logged in user from the database
 * The result is saved to res.locals.recipes
 */
const reqOption = require("../reqOptions").reqOption;
const dateFormat = require("../formatDate");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository, "Recipe");
    try {
      const recipes = await RecipeModel.find({
        publisher: req.params.userid,
      }).exec();

      const modifiedRecipes = recipes.map((recipe) => {
        const modifiedRecipe = {
          _id: recipe._id,
          name: recipe.name,
          text: recipe.description,
          image: recipe.image,
          published: dateFormat(recipe.published),
        };
        return modifiedRecipe;
      });

      res.locals.recipes = modifiedRecipes;
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    return next();
  };
};
