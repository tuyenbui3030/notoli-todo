const express = require("express");

const expressLayouts = require("express-ejs-layouts");
const app = express();
//Sử dụng để bắt request POST & GET...
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use("/public", express.static("public"));
app.use(express.static("public"));
//Sử dụng layout EJS
app.use(expressLayouts);
app.set("layout extractScripts", true);

app.set("layout", "../views/layouts/layout.ejs");
//View engine EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home/index");
});

app.use("/important", require("./routes/important.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
