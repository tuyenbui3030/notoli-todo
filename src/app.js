const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { sequelize } = require("./models");
const app = express();
//Sử dụng để bắt request POST & GET...
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use("/public", express.static("public"));

app.use(express.static(path.join(__dirname, "public")));
//Sử dụng layout EJS
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout", "../views/layouts/layout.ejs");
//View engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("home/index");
});

app.use("/important", require("./routes/important.route"));
app.use("/register", require("./routes/register.route"));

app.use(function (req, res) {
  res.send("404");
});
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("500");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log("Database synced!");
});
