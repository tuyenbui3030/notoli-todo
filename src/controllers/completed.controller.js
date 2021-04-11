const moment = require("moment");
const xss = require("xss");
const { sequelize, users, tasks, steps } = require("../models");
moment.updateLocale(moment.locale(), {
  invalidDate: moment(new Date()).format("LL"),
});
module.exports = {
  index: async (req, res) => {
    const checkPage = req.originalUrl;
    const user = req.session.authUser;
    const list = await tasks.findAll({
      where: {
        userId: user.id,
        status: true,
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
};
