require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const post = [
  {
    user: "gouri",
    age: 27,
  },
  {
    user: "bunty",
    age: 21,
  },
];

function authentication(req, res, next) {
  const head = req.headers["authorization"];
  const token = head && head.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/", authentication, (req, res) => {
  res.json(post.filter((p) => p.user === req.user));
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  res.json({ accessToken: accessToken });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
