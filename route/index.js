const authMW = require("../middlewares/generic/authMW");
const authHomeMW = require("../middlewares/generic/authHomeMW");
const inverseAuthMW = require("../middlewares/generic/inverseAuthMW");
const renderMW = require("../middlewares/generic/renderMW");
const getUserMW = require("../middlewares/account/getUserMW");
const checkForgotPasswordMW = require("../middlewares/account/checkForgottenPasswordMW");
const checkPassMW = require("../middlewares/account/checkPassMW");
const checkRegistrationMW = require("../middlewares/account/checkRegistrationMW");
const signOutUserMW = require("../middlewares/account/signoutUserMW");
const getLatestRecipesMW = require("../middlewares/recipe/getLatestRecipesMW");
const findRecipesMW = require("../middlewares/recipe/findRecipesMW");
const getRecipesMW = require("../middlewares/recipe/getRecipesMW");
const getRecipeMW = require("../middlewares/recipe/getRecipeMW");
const saveRecipeMW = require("../middlewares/recipe/saveRecipeMW");
const delRecipeMW = require("../middlewares/recipe/delRecipeMW");
const getSavedRecipesMW = require("../middlewares/recipe/getSavedRecipesMW");
const saveSavedRecipeMW = require("../middlewares/recipe/saveRecipeInSavedRecipesMW");
const delSavedRecipeMW = require("../middlewares/recipe/delSavedRecipeMW");
const path = require('path');

const multer  = require('multer');
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads/'); // specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + originalExtension); // generate a unique filename
  },
});

const upload = multer({ storage: storage });

const recipeModel = require('../models/recipe');
const userModel = require('../models/user');

module.exports = function (app) {
  var objRepo = {
    Recipe:recipeModel,
    User: userModel
  };
  /*Get recipes for the user*/
  app.get(
    "/recipe/:userid",
    authMW(objRepo),
    getRecipesMW(objRepo),
    renderMW(objRepo, "myrecipes")
  );
  /*Delete recipe from the user */
  app.use(
    "/recipe/del/:recipeid/:userid",
    authMW(objRepo),
    getUserMW(objRepo),
    getRecipeMW(objRepo),
    delRecipeMW(objRepo)
  );
  /*Get saved recipes for the user*/
  app.get(
    "/recipe/saved/:userid",
    authMW(objRepo),
    getUserMW(objRepo),
    getSavedRecipesMW(objRepo),
    renderMW(objRepo, "savedrecipes")
  );
  /*Delete saved recipe from the user*/
  app.use(
    "/recipe/saved/del/:recipeid/:userid",
    authMW(objRepo),
    delSavedRecipeMW(objRepo)
  );
  /*Display a recipe's details*/
  app.get(
    "/recipe/details/:recipeid",
    authHomeMW(objRepo),
    getRecipeMW(objRepo),
    renderMW(objRepo, "recipedetails")
  );
  /*Add recipe to the saved(liked) recipes */
  app.get(
    "/recipe/details/:recipeid/add/:userid",
    authMW(objRepo),
    getUserMW(objRepo),
    getRecipeMW(objRepo),
    saveSavedRecipeMW(objRepo)
  );

  /*New recipe*/
  app.use(
    "/recipe/new/:userid",
    authMW(objRepo),
    upload.single('recipeImage'),
    getUserMW(objRepo),
    saveRecipeMW(objRepo),
    renderMW(objRepo, "editnewrecipe")
  );
  /*Edit recipe */
  app.use(
    "/recipe/edit/:recipeid/:userid",
    authMW(objRepo),
    upload.single('recipeImage'),
    getUserMW(objRepo),
    getRecipeMW(objRepo),
    saveRecipeMW(objRepo),
    renderMW(objRepo, "editnewrecipe")
  );
  /* Load user's info and shared recipes*/
  app.get(
    "/account/:userid",
    authHomeMW(objRepo),
    getUserMW(objRepo),
    getRecipesMW(objRepo),
    renderMW(objRepo, "account")
  );

  app.use(
    "/account/:userid/logout",
    authMW(objRepo),
    signOutUserMW(objRepo)
  );
  /* Login screen */
  app.post(
    "/register",
    inverseAuthMW(objRepo),
    checkRegistrationMW(objRepo),
    renderMW(objRepo, "login")
  );
  app.use(
    "/login",
    inverseAuthMW(objRepo),
    checkPassMW(objRepo),
    renderMW(objRepo, "login")
  );
  app.post(
    "/newPw",
    inverseAuthMW(objRepo),
    checkForgotPasswordMW(objRepo),
    renderMW(objRepo, "login")
  );

  app.get("/?search", findRecipesMW(objRepo), renderMW(objRepo, "index"));
  app.use(
    "/",
    authHomeMW(objRepo),
    getLatestRecipesMW(objRepo),
    renderMW(objRepo, "index")
  );
};
