const express = require("express");
const morgan = require("morgan"); // menampilkan log request
const dotenv = require("dotenv"); //env
const expressLayouts = require("express-ejs-layouts"); //untuk template engine
//kebutuhan api
const cors = require("cors"); //untuk mengatasi error cors
const compression = require("compression"); //compresion thdp response
const bodyParser = require("body-parser"); // untuk parsing body request
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const path = require("path");
dotenv.config();
//diatas untuk
const app = express();
const port = process.env.PORT || 3004;

//kebutuhan api
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(cookieParser("secret"));

// middleware
app.use(morgan("dev"));

//setting template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//untuk set static folder
app.use(express.static("public"));

//deklarasi routers
const homeRouter = require("./routes/home");
const basicApiRouter = require("./routes/basicApi");
const contactApiRouter = require("./routes/contactApi");

//route
app.use("/", homeRouter);
//route
app.use("/api/basic", basicApiRouter);
app.use("/api/contacts", contactApiRouter);

//handle 404
app.use((req, res) => {
  res.status(404).send("<h1>404 Page not found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
