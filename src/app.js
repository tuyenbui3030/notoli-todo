const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
const restrict = require("./middlewares/auth.middleware");

require("express-async-errors");

const { sequelize, tasks, steps, users } = require("./models");
const app = express();

//middleware Cookie Session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

//Sử dụng để bắt request POST & GET...
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use("/public", express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "public")));
//Sử dụng layout EJS
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout", "../views/layouts/layout.ejs");
//View engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
require("./middlewares/locals.middleware")(app);

app.get("/test", restrict, async (req, res) => {
  const list = await tasks.findOne({
    where: { id: 9 },
    include: [
      {
        model: steps,
        as: "steps",
        required: false,
      },
    ],
  });
  const task = JSON.parse(JSON.stringify(list));

  res.json(task.steps[0]);
});
app.use("/", require("./routes/todo.route"));
app.use("/important", require("./routes/important.route"));
app.use("/register", require("./routes/register.route"));
app.use("/login", require("./routes/login.router"));
app.use("/logout", require("./routes/logout.route"));

app.use(function (req, res) {
  res.render("404", { layout: false });
});
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).render("500", { layout: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await sequelize.authenticate();
  await sequelize.sync();
  // console.log("Database synced!");
});
