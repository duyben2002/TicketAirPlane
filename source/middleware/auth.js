const connectRoles = require('connect-roles');

// Định nghĩa vai trò
const user = new connectRoles({
  failureHandler: (req, res, action) => {
    // Xử lý khi người dùng không có quyền truy cập
    res.status(403).send('Access denied');
  }
});

// Kiểm tra vai trò của người dùng
user.use((req, action) => {
  if (!req.session.account) {
    // Nếu chưa đăng nhập, không có vai trò
    return;
  }
  if (req.session.account.isAdmin) {
    // Nếu là admin, có vai trò admin
    return 'admin';
  }
  // Nếu không phải admin, có vai trò user
  return 'user';
});

// Middleware kiểm tra quyền truy cập vào trang quản trị
const requireAdmin = (req, res, next) => {
  if (req.user === 'admin') {
    // Nếu là admin, cho phép truy cập
    next();
  } else {
    // Nếu không phải admin, từ chối truy cập
    res.status(403).send('Access denied');
  }
};
function requireLogin(req, res, next) {
    if (req.session.user) {
      // Nếu người dùng đã đăng nhập, cho phép tiếp tục xử lý yêu cầu
      next();
    } else {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      res.redirect('/login');
    }
  }
  module.exports = {
    user,
    requireAdmin,
    requireLogin,
  };