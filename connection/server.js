const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // get form data
app.use(express.json()); // parse the json data

const data = [{ user: "bunty" }];

app.get("/", (req, res) => {
  res.json(data);
});
app.get("/contact", (req, res) => {
  res.json({ email: "bunty@gmail.com", phNo: 271324234 });
});
app.get("/cart", (req, res) => {
  res.json({ shirt: "white", pant: "blue" });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  data.push({ user: req.body.user });
  res.redirect("/");
});

app.listen(9000);
