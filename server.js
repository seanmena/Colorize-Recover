const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");
const session = require("express-session");
const passport = require("./config/passport");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "colorize", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const handlebar = require("express-handlebars");

app.engine("handlebars", handlebar({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");


const apiRouter = require("./routes/api-routes.js");
app.use(apiRouter);

const htmlRouter = require("./routes/html-routes");
app.use(htmlRouter);

const authRouter = require("./routes/auth-routes");
app.use("/auth", authRouter);
  
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("PORT: " + PORT);
  });
});
