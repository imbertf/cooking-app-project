const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
  alt: { type: String, required: true },
});

module.exports = mongoose.model("Image", imageSchema);
