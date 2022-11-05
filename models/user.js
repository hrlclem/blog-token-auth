const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, 
        min: [3, "Username length is too small"],
        required: [true, "please add an email"],
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

UserSchema.virtual("url").get(function () {
    return "/users/" + this._id;
  });

module.exports = mongoose.model("User", UserSchema);