module.exports = function (app) {
  //Start - middleware - nav thông tin đăng nhập
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  });
  //End - middleware - nav thông tin đăng nhập
};
