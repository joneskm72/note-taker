const express = require("express");
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});