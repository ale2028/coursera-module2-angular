var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.listen(3000, () => console.log("Server running on port 3000"));

var ciudades = ["Paris", "Barcelona", "Montevideo", "Santiago de Chile", "Mexico DF", "Nueva york"]
app.get("/ciudades", (req, res, next) => res.json(ciudades.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1 )));

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
    console.log(req.body);
    misDestinos = req.body;
    res.json(misDestinos);
});
