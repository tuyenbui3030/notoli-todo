const express = require("express");
const mydayController = require("../controllers/myday.controller");
const router = express.Router();

router.get("/", mydayController.index);

module.exports = router;
