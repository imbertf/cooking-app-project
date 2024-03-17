const mongoose = require("mongoose");

const termSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Term", termSchema);
