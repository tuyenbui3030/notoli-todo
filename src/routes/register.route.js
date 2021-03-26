const express = require("express");
const registerController = require("../controllers/register.controller");
const router = express.Router();

router.get("/", registerController.index);
router.post("/", registerController.submit);

module.exports = router;
