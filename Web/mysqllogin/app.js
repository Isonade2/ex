const express = require("express");
const app = express();
const session = require("express-session");
const db = require("./model/db");
const userRouter = require("./routes/user");

db.getConnection((err, conn) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");
  }
});
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret key" }));

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
