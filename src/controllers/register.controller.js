const { users } = require("../models");
const devConfig = require("../config/dev.json");
const bcrypt = require("bcryptjs");

module.exports = {
  index: (req, res) => {
    res.render("register/index", {
      layout: "../views/layouts/accountLayout.ejs",
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
    res.send(`add new user ID: ${result.id}`);
  },
};
