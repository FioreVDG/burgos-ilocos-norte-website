const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/icertify-web"));

app.get("*/", (req, res) =>
  res.sendFile("index.html", { root: "dist/burgos-ilocos-norte-website/" })
);

app.listen(process.env.PORT || 6969);