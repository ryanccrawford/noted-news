const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
    },
  summary: {
      type: String
    },
  image: {
      type: String
    },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
    },
  date: {
      type: String
    },
    category: {
        type: String
    }
});

ArticleSchema.plugin(uniqueValidator)

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;
