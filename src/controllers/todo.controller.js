const moment = require("moment");
const xss = require("xss");
const { sequelize, users, tasks, steps } = require("../models");
moment.updateLocale(moment.locale(), {
  invalidDate: moment(new Date()).format("LL"),
});
module.exports = {
  index: async (req, res) => {
    const checkPage = req.originalUrl;
    user = req.session.authUser;
    const list = await tasks.findAll({
      where: {
        userId: user.id,
        status: false,
      },
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
    res.render("home/index", { title: "Dashboard", todos, checkPage, moment });
  },
  create: async (req, res) => {
    const name = xss(req.body.name || "No name");
    const listStep = req.body.steps;
    const myDay = req.body.myDay ? true : false;
    const important = req.body.important ? true : false;
    const dueDate = xss(
      moment(req.body.dueDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
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
    const url = req.query.retUrl || "/";
    res.redirect(url);
    // res.redirect(req.originalUrl);
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
          order: [["id", "ASC"]],
        },
      ],
      order: [["steps", "id", "ASC"]],
    });
    const task = JSON.parse(JSON.stringify(list));
    res.render("detail/detail", { layout: false, task, moment });
  },
  update: async (req, res) => {
    console.log(req.body);
    const task = await tasks.findByPk(req.body.taskId);
    task.name = req.body.nameUpdate || "No name";
    task.dueDate = req.body.dueDateUpdate;
    task.note = req.body.noteUpdate;
    const importantUpdate = req.body.importantUpdate || false;
    const myDay = req.body.myDayUpdate || false;
    task.dueDate = moment(req.body.dueDateUpdate, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    console.log(
      moment(req.body.dueDateUpdate, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
    task.important = importantUpdate;
    task.myDay = myDay;

    console.log("KQ: ", req.body.myDayUpdate);
    task.save();
    const listStep = await steps.findAll({
      where: {
        taskId: req.body.taskId,
      },
    });
    const stepStatus = req.body.stepStatus;
    const stepId = req.body.stepId;
    const stepContent = req.body.stepUpdate;
    const stepDel = req.body.listDel;
    console.log(stepStatus);
    console.log(stepId);
    console.log(stepContent);
    const sizeStep = stepContent.length;
    for (var i = 0; i < sizeStep; i++) {
      if (stepContent[i].length > 0) {
        const updateStep = await steps.findByPk(stepId[i]);
        if (updateStep) {
          console.log(stepStatus[i]);
          console.log(stepContent[i]);
          updateStep.content = stepContent[i];
          updateStep.status = stepStatus[i];
          updateStep.save();
        } else {
          const obj = {
            content: stepContent[i],
            status: stepStatus[i],
            taskId: req.body.taskId,
          };
          await steps.create(obj);
        }
      }
    }
    if (stepDel != undefined) {
      const sizeDel = stepDel.length;
      for (var i = 0; i < sizeDel; i++) {
        const death = await steps.findByPk(stepDel[i]);
        if (death) {
          await steps.destroy({
            where: {
              id: stepDel[i],
            },
          });
        }
      }
    }

    res.redirect("/");
  },
};
