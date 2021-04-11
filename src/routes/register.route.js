const express = require("express");
const registerController = require("../controllers/register.controller");
const router = express.Router();

router.get("/", registerController.index);
router.get("/verify", registerController.verify);
router.post("/", registerController.submit);
router.post("/is-available", registerController.available);

module.exports = router;
