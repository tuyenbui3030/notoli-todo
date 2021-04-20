const { users } = require("../models");
const multer = require("multer");
module.exports = async (req, res, next) => {
  const userAvatar = await users.findByPk(res.locals.lcAuthUser.id);
  const storage = multer.diskStorage({
    filename(req, file, cb) {
      const rdnName = Date.now() + "-" + file.originalname;
      userAvatar.avatar = rdnName;
      res.locals.lcAuthUser.avatar = rdnName;
      cb(null, userAvatar.avatar);
      userAvatar.save();
    },
    destination(req, file, cb) {
      cb(null, "src/public/static/avatars");
    },
  });
  const upload = multer({ storage });
  upload.array("fuMain", 3)(req, res, function (err) {
    if (err) res.send(err);
  });
  const user = await users.findByPk(res.locals.lcAuthUser.id);
  await user.save();
  next();
};
