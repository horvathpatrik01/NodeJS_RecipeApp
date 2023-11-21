/**
 * Using POST params update or save a recipe to the database
 * If res.locals.recipe is there, it's an update otherwise this middleware creates an entity
 * Redirects to /recipe after success
 */
const reqOption = require("../reqOptions").reqOption;
const deleteImage = require("../deleteFile");
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    console.log(req.file,req.body);
    if(typeof req.body.recipeId === 'undefined' ||
       typeof req.body.recipeName === 'undefined'||
       typeof req.body.recipeDescription === 'undefined' ||
       typeof req.body.recipeIngredients === 'undefined' ||
       typeof req.body.recipeInstructions === 'undefined' ||
       (req.body.recipeId === "" && typeof req.file === 'undefined'))
      return next();
    else{
      const RecipeModel = reqOption(objectrepository,"Recipe");
      try{
        const { recipeId, recipeName, recipeDescription, recipeIngredients, recipeInstructions } = req.body;
        let user = res.locals.user;
        const file = req.file;
        if (recipeId==="") {
        // Case: Creating a new recipe
        const newRecipe = new RecipeModel({
          name:recipeName,
          image: `/uploads/${file.filename}`,
          description:recipeDescription,
          ingredients:recipeIngredients,
          instructions:recipeInstructions,
          published: new Date().getTime(),
          publisher: res.locals._userId,
        });

        // Save the new recipe
        await newRecipe.save();
        user.recipes.push(newRecipe._id);
        // Save the user object
        await user.save();
      } else {
        // Case: Modifying an existing recipe
        const existingRecipe = res.locals.recipe;
        console.log(existingRecipe);
        if (existingRecipe._id != recipeId || !user.recipes.includes(recipeId)) {
          // Recipe with the given ID not found
          return res.status(404).send('Recipe not found');
        }

        // Update the existing recipe with the new data
        existingRecipe.name = recipeName;
        if(typeof file !== 'undefined'){
          deleteImage(existingRecipe.image);
          existingRecipe.image = `/uploads/${file.filename}`;
        }
        existingRecipe.description = recipeDescription;
        existingRecipe.ingredients = recipeIngredients;
        existingRecipe.instructions = recipeInstructions;

        // Save the updated recipe
        await existingRecipe.save();
      }
      }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
      return res.redirect("/recipe/" + res.locals._userId);
    }
  };
};
