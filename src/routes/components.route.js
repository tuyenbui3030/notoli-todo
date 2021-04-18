const express = require("express");
const componentsController = require("../controllers/components.controller");
const router = express.Router();

router.post("/dynav", componentsController.dynav);

module.exports = router;
