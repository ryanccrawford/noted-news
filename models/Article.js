const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
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
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
