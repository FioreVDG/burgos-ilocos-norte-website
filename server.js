const express = require("express");
const path = require("path");
var forceSsl = require("force-ssl-heroku");

const app = express();

app.use(forceSsl);

app.use(express.static(__dirname + "/dist/burgos-ilocos-norte-website"));

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/dist/burgos-ilocos-norte-website/index.html")
  );
});

app.listen(process.env.PORT || 6969);
