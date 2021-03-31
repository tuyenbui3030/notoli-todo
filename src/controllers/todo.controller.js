const moment = require("moment");
const xss = require("xss");
const { users, tasks, steps } = require("../models");
moment.updateLocale(moment.locale(), {
  invalidDate: moment(new Date()).format("LL"),
});
module.exports = {
  index: async (req, res) => {
    user = req.session.authUser;
    const list = await tasks.findAll({
      where: {
        userId: user.id,
      },
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
};
