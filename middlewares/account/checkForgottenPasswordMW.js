/**
 * Check if the email address is already registered, if it is,
 *  generate new password (no extra checks on password)
 */
const reqOption = require("../reqOptions").reqOption;
module.exports = function (objectrepository) {
  return async function (req, res, next) {
    const UserModel = reqOption(objectrepository, "User");
    const { username } = req.body;
    try{
      const user = await UserModel.findOne({
        username: username
      }).exec();
  
      if (!user) {
        res.locals.usernameError = "User not found";
        return next();
      }
      // Generate a new random password
      const newPassword = generateRandomPassword();
      user.password = newPassword;
      res.locals.newPassword = newPassword;
      await user.save();
      console.log(res.locals.newPassword);
      return next();
    }catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
};
function generateRandomPassword() {
  const length = 6;
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  let password = '';
  // Add the first 3 characters as letters
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    password += letters.charAt(randomIndex);
  }
  // Add the remaining characters
  for (let i = 3; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  
  return password;
}