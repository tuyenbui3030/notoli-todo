const { users } = require("../models");
module.exports = {
  index: async (req, res) => {
    const checkPage = req.originalUrl;
    res.render("profile/index", { checkPage });
  },
  submit: async (req, res) => {
    res.locals.lcAuthUser.name = req.body.name;
    const user = await users.findByPk(res.locals.lcAuthUser.id);
    user.name = req.body.name;
    await user.save();
    // const userAvatar = await users.findByPk(res.locals.lcAuthUser.id);
    // const storage = multer.diskStorage({
    //   filename(req, file, cb) {
    //     const rdnName = Date.now() + "-" + file.originalname;
    //     userAvatar.avatar = rdnName;
    //     res.locals.lcAuthUser.avatar = rdnName;
    //     cb(null, userAvatar.avatar);
    //     userAvatar.save();
    //   },
    //   destination(req, file, cb) {
    //     cb(null, "src/public/static/avatars");
    //   },
    // });
    // const upload = multer({ storage });

    // res.locals.lcAuthUser.name = "Tuyen";
    // upload.array("fuMain", 3)(req, res, function (err) {
    //   if (err) res.send(err);
    // });
    // const user = await users.findByPk(res.locals.lcAuthUser.id);
    // await user.save();
    // // res.send(res.locals.lcAuthUser.avatar);
    res.redirect(req.originalUrl);
  },
};
