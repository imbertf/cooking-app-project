const mongoose = require("mongoose");
const termSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Term = mongoose.model("Term", termSchema);

module.exports = Term;
