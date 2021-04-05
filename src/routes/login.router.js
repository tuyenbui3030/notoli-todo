const express = require("express");
const loginController = require("../controllers/login.controller");
const router = express.Router();
const restrict = require("../middlewares/login.middleware");
router.get("/", restrict, loginController.index);
router.post("/", loginController.submit);

module.exports = router;
