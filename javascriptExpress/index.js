const express = require("express");
const app = express();
const port = 8000;

app.get("/performance", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Express server start, port: ${port}`);
});
