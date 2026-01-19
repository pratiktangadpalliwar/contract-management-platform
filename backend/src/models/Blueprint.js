const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "date", "signature", "checkbox"], required: true },
  label: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

module.exports = mongoose.model("Blueprint", new mongoose.Schema({
  name: { type: String, required: true },
  fields: [FieldSchema]
}));
