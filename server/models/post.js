const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var d = new Date();

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: [
      "Lifestyle",
      "Fitness",
      "Knowledge",
      "Culture",
      "Religion",
      "Health",
      "Food and Cooking",
      "Personal Finance",
      "Travel",
      "Science",
    ],
    default: "Fitness",
  },

  image: {
    type: String,
  },

  content: {
    type: String,
    require: true,
  },

  date: {
    type: String,
    default: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
