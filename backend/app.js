var events = require('events').EventEmitter.defaultMaxListeners = 0;

const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authenticationRoutes = require('./routes/au-routes.js');

const corsOptions = {
  origin:"http://localhost:8080", // "http://192.168.0.101:8080",
  credentials: true
};
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.static(__dirname))
app.use('/api/au/', authenticationRoutes)



require("./routes/fish-routes")(app);
require("./routes/user-routes")(app);
require("./routes/bait-routes")(app);
require("./routes/method-routes")(app);
require("./routes/review-routes")(app);
require("./routes/fact-routes")(app);
require("./routes/geo-routes")(app);
require("./routes/company-routes")(app);
require("./routes/department-routes")(app);
require("./routes/plan-routes")(app);



app.listen(3000) //, '192.168.0.101'); 