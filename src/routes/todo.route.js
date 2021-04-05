const express = require("express");
const todoController = require("../controllers/todo.controller");
const router = express.Router();
const restrict = require("../middlewares/auth.middleware");

router.get("/", restrict, todoController.index);
router.post("/", restrict, todoController.create);
router.post("/todo/update", restrict, todoController.update);
router.post("/todo/status", restrict, todoController.status);
router.post("/todo/important", restrict, todoController.important);
router.post("/todo/myday", restrict, todoController.myday);
router.post("/todo/destroy", restrict, todoController.destroy);
router.post("/todo/detail", restrict, todoController.detail);

module.exports = router;
