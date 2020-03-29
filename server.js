var express = require("express");
// initialize express
var app = express();

var PORT = process.env.PORT || 8080;
// return as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routs
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
// listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
