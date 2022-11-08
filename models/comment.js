const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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
    article: { 
        type: Schema.Types.ObjectId, 
        ref: "Article"
        },
});

module.exports = mongoose.model("Article", ArticleSchema);