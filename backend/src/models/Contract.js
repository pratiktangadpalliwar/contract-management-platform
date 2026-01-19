const mongoose = require("mongoose");

module.exports = mongoose.model("Contract", new mongoose.Schema({
  name: { type: String, required: true },
  blueprint: { type: mongoose.Schema.Types.ObjectId, ref: "Blueprint", required: true },
  values: [{ fieldId: mongoose.Schema.Types.ObjectId, value: mongoose.Schema.Types.Mixed }],
  status: {
    type: String,
    enum: ["Created", "Approved", "Sent", "Signed", "Locked", "Revoked"],
    default: "Created"
  },
  createdAt: { type: Date, default: Date.now }
}));
