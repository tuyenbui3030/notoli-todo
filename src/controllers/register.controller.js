const { users } = require("../models");
const devConfig = require("../config/dev.json");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

module.exports = {
  index: (req, res) => {
    res.render("register/index", {
      layout: "../views/layouts/accountLayout.ejs",
      title: "Register",
    });
  },
  submit: async (req, res) => {
    const domain = req.protocol + "://" + req.get("host");

    const password = bcrypt.hashSync(
      req.body.password,
      devConfig.authentication.saltRounds
    );
    const token = bcrypt.hashSync(
      req.body.email,
      devConfig.authentication.saltRounds
    );
    const user = {
      password,
      email: req.body.email,
      name: req.body.name,
      avatar: "user.png",
      role: 0,
      token,
    };
    const result = await users.create(user);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "notolistore@gmail.com",
        pass: "gauden123",
      },
    });

    // await transporter
    //   .sendMail({
    //     from: "notolistore@gmail.com",
    //     to: req.body.email,
    //     subject: "Verify Account",
    //     text: "Click Here to verify",
    //     html: `<p>Click <a href="${domain}/register/verify?token=${token}"> Here</a> to verify</p>`,
    //   })
    //   .then(console.log)
    //   .catch(console.error);
    const test = await transporter.sendMail({
      from: "notolistore@gmail.com",
      to: req.body.email,
      subject: "Verify Account",
      text: "Click Here to verify",
      html: `<p>Click <a href="${domain}/register/verify?token=${token}"> Here</a> to verify</p>`,
    });
    const objTest = JSON.stringify(test);
    res.render("register/success", {
      layout: "../views/layouts/accountLayout.ejs",
      email: result.email,
      title: "Register",
      objTest,
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
  verify: async (req, res) => {
    const user = await users.findOne({
      where: {
        token: req.query.token,
      },
    });
    const newToken = bcrypt.hashSync(
      user.email,
      devConfig.authentication.saltRounds
    );
    user.verify = true;
    user.token = newToken;
    await user.save();
    res.render("register/success", {
      layout: "../views/layouts/accountLayout.ejs",
      email: user.email,
      title: "Register",
    });
  },
};
