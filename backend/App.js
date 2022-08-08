const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.post("/log", (req, res) => {
  console.log(
    "Operation name: " + req.body.operation + ", data - " + req.body.data
  );
  res.sendStatus(200);
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(3009, () => {
  console.log("starting...");
});
