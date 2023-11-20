/**
 * Copies the selected recipe to a saved recipe in the database, so the user can see it,
 * even after the original recipe has been deleted.
 * Renders the current recipedetails page
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    let user = res.locals.user;
    try{
      user.savedRecipes.push(res.locals.recipe._id);
      await user.save();
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    return res.redirect("/recipe/details/" + res.locals.recipe._id);
  };
};
