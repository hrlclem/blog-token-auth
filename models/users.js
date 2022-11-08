const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String, 
        min: [3, "Username length is too small"],
        required: [true, "please add a username"],
        },
    password: {
        type: String, 
        min: [3, "Password length is too small"],
        required: [true, "please add a password"]
        },
    articles: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Article"
        }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Comment"
        }],
});

UsersSchema.virtual("url").get(function () {
    return "/users/" + this._id;
  });

module.exports = mongoose.model("Users", UsersSchema);