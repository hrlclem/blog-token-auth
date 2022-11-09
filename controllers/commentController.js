
exports.comment_list = (req,res) => {                     // Display all comments of an article page GET
  res.render('comment', { title: 'COMMENTS' });
};

exports.comment_add_get = (req,res) => {                  // Add comment GET
  res.render('comment', { title: 'COMMENT' });
};

exports.comment_add_post = (req,res) => {                  // Add comment POST
  res.render('comment', { title: 'COMMENT' });
};
  
exports.comment_delete = (req,res) => {                   // Delete Comment
  res.render('comment', { title: 'DELETE COMMENT' });
};
