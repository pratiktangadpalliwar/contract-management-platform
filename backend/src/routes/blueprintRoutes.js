const express = require("express");
const Blueprint = require("../models/Blueprint");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const blueprint = await Blueprint.create(req.body);
    res.json(blueprint);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (_, res) => {
  res.json(await Blueprint.find());
});

router.get("/:id", async (req, res) => {
  const bp = await Blueprint.findById(req.params.id);
  if (!bp) return res.status(404).json({ error: "Not found" });
  res.json(bp);
});

module.exports = router;
