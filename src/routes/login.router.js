const express = require("express");
const loginController = require("../controllers/login.controller");
const router = express.Router();

router.get("/", loginController.index);
router.post("/", loginController.submit);

module.exports = router;
