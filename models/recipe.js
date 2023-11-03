const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Recipe = db.model("Recipe", {
  name: String,
  image: String,
  description: String,
  ingredients: String,
  instructions: String,
  published: Date,
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Recipe;
