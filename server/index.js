const express = require("express");
require('dotenv').config();

const app = express();

console.log(process.env.DB)

app.listen(8080, () =>
  console.log("Server listening on http://localhost:8080")
);
