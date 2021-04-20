const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const avatar = require("../middlewares/multer.middleware");
router.get("/", profileController.index);
router.post("/", avatar, profileController.submit);

module.exports = router;
