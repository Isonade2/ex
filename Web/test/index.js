const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
