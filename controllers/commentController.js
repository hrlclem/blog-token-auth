
exports.comment_list = (req,res) => {                 // Display all comments of an article page GET
  res.render('comment', { title: 'COMMENTS' });
};
   
exports.comment_details_get = (req,res) => {           // Display Comment page GET
  res.render('comment', { title: 'COMMENT' });
};
  
exports.comment_delete = (req,res) => {                // Delete Comment
  res.render('comment', { title: 'DELETE COMMENT' });
};
