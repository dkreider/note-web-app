const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", require("./api/routes"));
app.use(express.static("public"))
app.listen(port, function() {
    console.log("Listening on port", port);
});