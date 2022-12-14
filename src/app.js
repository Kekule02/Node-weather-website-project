const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// const { rmSync } = require("fs");

const app = express();
const port = process.env.PORT || 3000;

//// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

////// home page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lawal Azeez",
  });
});

/////// About page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Lawal Azeez",
  });
});

///// Help page
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful Text",
    title: "Help",
    name: "Lawal Azeez",
  });
});

/////// Weather Page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address !",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

/////// Product Page
app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//////// Help page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lawal Azeez",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lawal Azeez",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
