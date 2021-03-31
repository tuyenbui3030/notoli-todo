const express = require("express");
const todoController = require("../controllers/todo.controller");
const router = express.Router();
const restrict = require("../middlewares/auth.middleware");

router.get("/", restrict, todoController.index);
router.post("/", restrict, todoController.create);

module.exports = router;
