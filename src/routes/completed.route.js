const express = require("express");
const completedController = require("../controllers/completed.controller");
const router = express.Router();

router.get("/", completedController.index);

module.exports = router;
