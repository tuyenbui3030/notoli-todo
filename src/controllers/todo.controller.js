const moment = require("moment");
const xss = require("xss");
const { sequelize, users, tasks, steps } = require("../models");
moment.updateLocale(moment.locale(), {
  invalidDate: moment(new Date()).format("LL"),
});
module.exports = {
  index: async (req, res) => {
    user = req.session.authUser;
    const list = await tasks.findAll({
      where: { userId: user.id },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM steps AS steps WHERE steps."taskId" = tasks.id)`
            ),
            "totalStep",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM steps AS steps WHERE steps."taskId" = tasks.id AND steps.status = true)`
            ),
            "doneStep",
          ],
        ],
      },
      include: [
        {
          model: steps,
          as: "steps",
          required: false,
        },
      ],
    });
    const todos = JSON.parse(JSON.stringify(list));
    res.render("home/index", { title: "Dashboard", todos, moment });
  },
  create: async (req, res) => {
    const name = xss(req.body.name);
    const listStep = req.body.steps;
    const myDay = req.body.myDay ? true : false;
    const important = req.body.important ? true : false;
    const dueDate = xss(req.body.dueDate);
    const note = xss(req.body.note);
    const obj = {
      name,
      myDay,
      important,
      dueDate,
      note,
      status: false,
      userId: req.session.authUser.id,
    };
    const newTask = await tasks.create(obj);
    listStep.forEach(async (item) => {
      const content = xss(item);
      if (content.length > 0) {
        const obj = {
          content,
          status: false,
          taskId: newTask.id,
        };
        await steps.create(obj);
      }
    });
    res.redirect("/");
  },
  status: async (req, res) => {
    const task = await tasks.findByPk(req.body.taskId);
    task.status = req.body.status;
    await task.save();
    res.send(task);
  },
  important: async (req, res) => {
    const task = await tasks.findByPk(req.body.taskId);
    task.important = req.body.important;
    await task.save();
    res.send(task);
  },
  myday: async (req, res) => {
    const task = await tasks.findByPk(req.body.taskId);
    task.myDay = req.body.myday;
    await task.save();
    res.send(task);
  },
  destroy: async (req, res) => {
    const task = await tasks.findByPk(req.body.taskId);
    await steps.destroy({
      where: {
        taskId: req.body.taskId,
      },
    });
    await task.destroy();
    res.send(task);
  },
  detail: async (req, res) => {
    const list = await tasks.findOne({
      where: { id: req.body.taskId },
      include: [
        {
          model: steps,
          as: "steps",
          required: false,
        },
      ],
    });
    const task = JSON.parse(JSON.stringify(list));
    res.render("detail/detail", { layout: false, task, moment });
  },
  update: async (req, res) => {
    console.log(req.body);
    const task = await tasks.findByPk(req.body.taskId);
    task.name = req.body.nameUpdate;
    task.dueDate = req.body.dueDateUpdate;
    task.save();
    const listStep = await steps.findAll({
      where: {
        taskId: req.body.taskId,
      },
    });
    const sizeStep = listStep.length;
    const stepStatus = req.body.stepStatus;
    const stepId = req.body.stepId;
    const stepContent = req.body.stepUpdate;
    for (var i = 0; i < sizeStep; i++) {
      if (stepContent[i].length > 0) {
        const updateStep = await steps.findByPk(stepId[0]);
        if (updateStep) {
          updateStep.content = stepContent[i];
          updateStep.status = stepStatus[i];
          updateStep.save();
        } else {
          console.log("dmm");
        }
      }
    }
    res.redirect("/");
  },
};
