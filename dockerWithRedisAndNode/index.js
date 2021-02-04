const express = require("express");
const morgan = require("morgan");
const { keys } = require("./redis");

const worker = require("./worker");

const app = express();

const port = process.env.PORT;

app.use(morgan("tiny"));
app.get("/", (req, res) => res.send("Hello There!"));
app.get("/:key", async (req, res) => {
  const { key } = req.params;
  return res.json(await worker.fetch(key));
});
app.get("/store/:key", async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  return res.send(await worker.store(key, value));
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
