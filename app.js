const express = require("express");
const { generateHashes, generateHash } = require("./hash");

const app = express();

app.get("/fast", async (req, res) => {
  let hashes = await generateHashes(req.query.count);
  res.send(hashes);
});

app.get("/slow", async (req, res) => {
  req.query.count = req.query.count || 1;

  let hashes = [];
  for (let i = 0; i < req.query.count; i++) {
    let hash = await generateHash();
    hashes.push(hash);
  }
  res.send(hashes);
});

app.listen(3000, () => console.log("App running on port 3000"));
