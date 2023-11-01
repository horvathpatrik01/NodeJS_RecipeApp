const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Recipe = db.model('Recipe', {
    name: String,
    image: Image,
    description: String,
    ingredients: String,
    instructions: String,
    publisher:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Recipe;