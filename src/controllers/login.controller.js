const { users } = require("../models");

const bcrypt = require("bcryptjs");

module.exports = {
  index: (req, res) => {
    res.render("login/index", {
      layout: "../views/layouts/accountLayout.ejs",
      title: "Login",
      err: false,
    });
  },
  submit: async (req, res) => {
    const result = await users.findAll({
      where: {
        email: req.body.email,
      },
    });
    user = result[0];
    if (result.length < 1) {
      return res.render("login/index", {
        layout: "../views/layouts/accountLayout.ejs",
        title: "Login",
        err: "Email is not registered at notoli.com",
      });
    }
    const rs = bcrypt.compareSync(req.body.password, user.password);
    if (rs === false) {
      return res.render("login/index", {
        layout: "../views/layouts/accountLayout.ejs",
        title: "Login",
        err: "Your password incorrect",
      });
    }
    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    const url = req.query.retUrl || "/";
    res.redirect(url);
  },
};
