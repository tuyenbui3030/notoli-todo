const { users } = require("../models");
const devConfig = require("../config/dev.json");
const bcrypt = require("bcryptjs");

module.exports = {
  index: (req, res) => {
    res.render("register/index", {
      layout: "../views/layouts/accountLayout.ejs",
      title: "Register",
    });
  },
  submit: async (req, res) => {
    const password = bcrypt.hashSync(
      req.body.password,
      devConfig.authentication.saltRounds
    );
    const user = {
      password,
      email: req.body.email,
      name: req.body.name,
      avatar: "user.png",
      role: 0,
    };
    const result = await users.create(user);
    console.log(result);
    res.render("register/success", {
      layout: "../views/layouts/accountLayout.ejs",
      email: result.email,
      title: "Register",
    });
  },
  available: async (req, res) => {
    const email = await users.findAll({
      where: {
        email: req.query.email,
      },
    });
    console.log(email);
    if (email.length < 1) {
      return res.json(true);
    }
    res.json(false);
  },
};
