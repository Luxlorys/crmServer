const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const {checkCurrentUser, requireAuth} = require("./src/middlewares/authMiddleware");
const userRoutes = require('./src/routes/userRoutes');
const productRoutes= require("./src/routes/productRoutes");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("works fine");
});

app.get("*", checkCurrentUser); // for every request check current user
app.get('/home', requireAuth, (req, res) => res.status(201).json({ message: "home page"}));

app.use(userRoutes);

app.use('/products',productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (req.file) {
    const { path } = req.file;
    fs.unlinkSync(path);
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
