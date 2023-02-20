const express = require("express");
const path = require("path");

import sslRedirect from "heroku-ssl-redirect";

const app = express();

// enable ssl redirect
app.use(sslRedirect());

app.use(express.static(__dirname + "/dist/burgos-ilocos-norte-website"));

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/dist/burgos-ilocos-norte-website/index.html")
  );
});

app.listen(process.env.PORT || 6969);
