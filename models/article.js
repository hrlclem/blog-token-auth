const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String, 
        min: [3, "Title length is too small"],
        required: [true, "please add a title"]
        },
    content: {
        type: String, 
        min: [3, "Content length is too small"],
        required: [true, "please add a message content"]
        },
    date: {
        type: Date, 
        default: Date.now(),
        },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "Users"
        },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Comment"
        }],
});

ArticleSchema.virtual("url").get(function () {
    return "/users/articles/" + this._id;
  });

module.exports = mongoose.model("Article", ArticleSchema);