const express = require("express");
const path = require("path");
const fs = require('fs')
const jsonData = require('./pkgs.json');
const dataRoute = "./pkgs.json"; // Define the variable here

const app = express();

app.get('/jsonData', (req, res) => {
  res.json(jsonData);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9002;

app.get("/", (req, res) => {
  res.redirect(301, '/edit/package');
});

app.get(["/edit/package","/edit/package/:id"], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/savePackage', (req, res) => {
  const packageSchema = req.body;
  console.log(req.body)

  fs.writeFile(dataRoute, JSON.stringify(packageSchema), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving package schema to file.");
    } else {
      console.log("Package schema saved successfully!");
      res.status(200).send("Package schema saved successfully!");
    }
  });
});

app.use('/public', express.static(path.join(__dirname, '../frontend/public')));
app.use('/pkgs.json', express.static(path.join(__dirname, './pkgs.json')));

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
