const express = require("express");
const importantController = require("../controllers/important.controller");
const router = express.Router();

router.get("/", importantController.index);

module.exports = router;
