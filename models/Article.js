const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  body: String,
  likes: Number,
  imageUrl: String,
});

const Article = mogoose.model("Article", articleSchema);

module.exports = Article;
