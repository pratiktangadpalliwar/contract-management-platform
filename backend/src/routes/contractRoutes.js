const express = require("express");
const Contract = require("../models/Contract");
const router = express.Router();

const allowed = {
  Created: ["Approved", "Revoked"],
  Approved: ["Sent", "Revoked"],
  Sent: ["Signed", "Revoked"],
  Signed: ["Locked"],
  Locked: [],
  Revoked: []
};

router.post("/", async (req, res) => {
  try {
    const c = await Contract.create(req.body);
    res.json(c);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (_, res) => {
  res.json(await Contract.find().populate("blueprint"));
});

router.get("/:id", async (req, res) => {
  res.json(await Contract.findById(req.params.id).populate("blueprint"));
});

router.put("/:id/status", async (req, res) => {
  const c = await Contract.findById(req.params.id);
  if (!allowed[c.status]?.includes(req.body.newStatus))
    return res.status(400).json({ error: "Invalid transition" });
  c.status = req.body.newStatus;
  await c.save();
  res.json(c);
});

module.exports = router;
