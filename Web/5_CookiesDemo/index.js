const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res) => {
  const { name = "unknown" } = req.cookies;
  res.send(`Hey there ${name}!`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "Jane Doe");
  res.cookie("age", "23");
  res.send("ok sent cookie");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("ok signed!");
});

app.get("/verifyfruit", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send(req.signedCookies);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
