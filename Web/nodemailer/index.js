const express = require("express");

const app = express();
const userRouter = require("./routes/user");
const mailRouter = require("./routes/mail");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/mail", mailRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
