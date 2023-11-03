/**
 * Load the latest shared recipes from the database
 * The result is saved to res.locals.latestRecipes
 */

const reqOption = require("../reqOptions").reqOption;
const dateFormat = require("../formatDate");

module.exports = function (objectrepository) {
  return async function (req, res, next) {
    if (req.path !== "/") {
      return next();
    }
    // Default test values for the index page
    const UserModel = reqOption(objectrepository, "User");
    const RecipeModel = reqOption(objectrepository, "Recipe");
    try {
      const latestRecipes = await RecipeModel.find({})
        .sort({ published: -1 }) // Sort in descending order based on the creation date
        .limit(6) // Limit the results to 6 recipes
        .exec();
      const modifiedRecipes = await Promise.all(
        latestRecipes.map(async (recipe) => {
          const user = await UserModel.findById(recipe.publisher).exec();
          let publisherName = user.username;

          if (
            typeof res.locals._userId !== "undefined" &&
            res.locals._userId == recipe.publisher
          ) {
            publisherName = undefined;
          }
          let modifiedRecipe = {
            _id: recipe._id,
            name: recipe.name,
            text: recipe.description,
            image: recipe.image,
            published: dateFormat(recipe.published),
            publishedBy:
              typeof publisherName !== "undefined" ? publisherName : undefined,
          };

          return modifiedRecipe;
        })
      );
      res.locals.latestRecipes = modifiedRecipes;
      return next();
    } catch (error) {
      // Handle any potential errors, e.g., log the error or send an error response
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
};
