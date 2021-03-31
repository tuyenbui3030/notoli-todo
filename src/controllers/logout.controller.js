const { users } = require("../models");

const bcrypt = require("bcryptjs");

module.exports = {
  logout: (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
  },
};
