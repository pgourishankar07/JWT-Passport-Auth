const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ user: "bunty", age: 27 });
});
app.get("/contact", (req, res) => {
  res.json({ email: "bunty@gmail.com", phNo: 271324234 });
});
app.get("/cart", (req, res) => {
  res.json({ shirt: "white", pant: "blue" });
});

app.listen(9000);
