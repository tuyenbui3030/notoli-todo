const express = require("express");
const logoutController = require("../controllers/logout.controller");
const router = express.Router();

router.post("/", logoutController.logout);

module.exports = router;
