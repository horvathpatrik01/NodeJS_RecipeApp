/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  const UserModel = reqOption(objectrepository, "User");
  return async function (req, res, next) {
    if (
      typeof req.body.password === "undefined" ||
      typeof req.body.username === "undefined"
    ) {
      return next();
    }
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({
        username: username,
        password: password,
      }).exec();
      if (user) {
        // Authentication successful
        req.session.belepve = true;
        req.session._userid = user._id;
        await req.session.save();
        return res.redirect("/");
      } else {
        // Authentication failed
        res.locals.error = "Hibás jelszó!";
        // Handle the error, e.g., display an error message
        // or redirect to a login page with an error message
        // res.render('login', { error: 'Hibás jelszó!' });
      }
    } catch (error) {
      // Handle any potential errors, e.g., log the error or send an error response
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    return next();
  };
};
