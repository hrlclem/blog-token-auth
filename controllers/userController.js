
exports.users_list = (req,res) => {               // Display all users page GET
  res.render('index', { title: 'USERS' });
};
exports.profile_detail = (req,res) => {           // Display profile page GET
  res.render('profile', { title: 'PROFILE' });
};



exports.signup_get = (req,res) => {               // Display signup GET
  res.render('signup', { title: 'SIGNUP' });
};
exports.signup_post = (req,res) => {              // Process signup POST
  res.render('signup', { title: 'SIGNUP' });
};
exports.login_get = (req,res) => {               // Display login page GET
  res.render('login', { title: 'LOGIN' });
};
exports.login_post = (req,res) => {               // Process login  POST
  res.render('login', { title: 'LOGIN' });
};

// Logout
