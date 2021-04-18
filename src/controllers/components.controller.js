const moment = require("moment");
const xss = require("xss");
const { sequelize, users, tasks, steps } = require("../models");
moment.updateLocale(moment.locale(), {
  invalidDate: moment(new Date()).format("LL"),
});
module.exports = {
  dynav: async (req, res) => {
    // const countTask = await tasks.findAndCountAll({
    //   where: {
    //     userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
    //     status: false,
    //   },
    // });
    // const countMyday = await tasks.findAndCountAll({
    //   where: {
    //     userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
    //     status: false,
    //     myDay: true,
    //   },
    // });
    // const countImportant = await tasks.findAndCountAll({
    //   where: {
    //     userId: res.locals.lcAuthUser ? res.locals.lcAuthUser.id : -1,
    //     status: false,
    //     important: true,
    //   },
    // });
    // res.locals.countImportant = countImportant.count;
    // res.locals.countMyday = countMyday.count;
    // res.locals.countTask = countTask.count;
    // console.log(res.locals.countImportant);
    // console.log(res.locals.countMyday);
    // console.log(res.locals.countTask);

    res.render("components/dynav", { layout: false });
    // res.render("detail/detail", { layout: false, task, moment });
  },
};
