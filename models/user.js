const Schema = require("mongoose").Schema;
const db = require("../config/db");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  savedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const User = db.model("User", userSchema);
User.ensureIndexes();
module.exports = User;
