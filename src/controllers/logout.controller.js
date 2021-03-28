const { users } = require("../models");

const bcrypt = require("bcryptjs");

module.exports = {
  logout: (req, res) => {
    console.log("logout");
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
  },
};
