const mongoose = require("mongoose");
const termSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Term = mongoose.model("Term", termSchema);

module.exports = Term;
