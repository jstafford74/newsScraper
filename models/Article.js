const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },

  link: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
