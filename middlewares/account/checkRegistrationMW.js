/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    var UserModel = objectrepository["User"];
    const { username, password } = req.body;
    try {
      // Create a new user
      const user = new UserModel({
        username: username,
        password: password
      });
      const savedUser=user.save()
        .then((user) => {
          console.log(user._id);
          req.session.belepve = true;
          req.session._userid = user._id;
        })
        .catch((error)=>{
          if (error.code === 11000) {
            // The error code 11000 indicates a duplicate key error (E11000 duplicate key error collection).
            // Handle the duplicate username error here.
            console.log('Username already exists\n');
            res.locals.registerError = "Username already exists.";
          } else {
            // Handle other errors
            console.error(error);
            res.locals.registerError = "Something happened, but not the username";
          }
         });
      if(typeof res.locals.registerError === 'undefined' && req.session.belepve === true){
        await req.session.save();
        return res.redirect('/');
      }
    } catch (error) {
      // Handle any potential errors, e.g., log the error or send an error response
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    return next();
  };
};
