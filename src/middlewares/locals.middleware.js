const { sequelize, tasks } = require("../models");

module.exports = function (app) {
  //Start - middleware - nav thông tin đăng nhập
  app.use(function (req, res, next) {
    if (req.session.isAuthenticated === undefined) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  });
  app.use(function (req, res, next) {
    console.log("Hello", req.query.retUrl ? req.query.retUrl : "/");
    res.locals.curentUrl = req.query.retUrl ? req.query.retUrl : "/";
    next();
  });
  app.use(async function (req, res, next) {
    console.log(res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1);
    const countTask = await tasks.findAndCountAll({
      where: {
        userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
        status: false,
      },
    });
    res.locals.countTask = countTask.count;
    console.log(res.locals.countTask);
    next();
  });

  app.use(async function (req, res, next) {
    const countMyday = await tasks.findAndCountAll({
      where: {
        userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
        status: false,
        myDay: true,
      },
    });
    res.locals.countMyday = countMyday.count;
    next();
  });

  app.use(async function (req, res, next) {
    const countImportant = await tasks.findAndCountAll({
      where: {
        userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
        status: false,
        important: true,
      },
    });
    res.locals.countImportant = countImportant.count;
    next();
  });
  //End - middleware - nav thông tin đăng nhập
};
