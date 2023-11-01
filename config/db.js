const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipieren', { useNewUrlParser: true });

module.exports = mongoose;