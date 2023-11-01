const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
  username: String,
  password: String,
  recipes:[
    {
        type:Schema.Types.ObjectId,
        ref:'Recipe'
    }
  ],
  savedRecipes:[
    {
        type:Schema.Types.ObjectId,
        ref:'Recipe'
    }
  ]
});

module.exports = User;