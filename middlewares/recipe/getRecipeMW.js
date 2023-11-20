/**
 * Load 1 recipe (recipeid) by the logged in user from the database
 * The result is saved to res.locals.recipe
 */
const reqOption = require("../reqOptions").reqOption;
const dateFormat = require("../formatDate");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository,"Recipe");
    const UserModel = reqOption(objectrepository,"User");
    try{
      const recipe = await RecipeModel.findById(req.params.recipeid).exec();
    if(typeof res.locals.user !== 'undefined'){
      res.locals.recipe = recipe;
    }
    else{
      const user = await UserModel.findById(recipe.publisher).exec();
      let publisherName = user.username;

      if (
        res.locals.isAuthenticated === true &&
        res.locals._userId == recipe.publisher
      ) {
        publisherName = undefined;
      }
      const modifiedRecipe = {
        _id: recipe._id,
        name: recipe.name,
        image: recipe.image,
        description: recipe.description,
        ingredients:recipe.ingredients,
        instructions:recipe.instructions,
        publisher:recipe.publisher,
        publishedBy:
              typeof publisherName !== "undefined" ? publisherName : undefined,
        published: dateFormat(recipe.published),
      };
      res.locals.recipe = modifiedRecipe;
    }
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    return next();
  };
};
