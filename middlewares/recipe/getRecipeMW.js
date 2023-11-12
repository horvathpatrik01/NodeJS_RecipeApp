/**
 * Load 1 recipe (recipeid) by the logged in user from the database
 * The result is saved to res.locals.recipe
 */
const reqOption = require("../reqOptions").reqOption;
const dateFormat = require("../formatDate");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const RecipeModel = reqOption(objectrepository,"Recipe");
    try{
      const recipe = await RecipeModel.findById(req.params.recipeid).exec();
    if(typeof res.locals.username !== 'undefined'){
      res.locals.recipe = recipe;
    }
    else{
      const modifiedRecipe = {
        _id: recipe._id,
        name: recipe.name,
        text: recipe.description,
        image: recipe.image,
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
