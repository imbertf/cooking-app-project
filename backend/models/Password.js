const passwordValidator = require("password-validator");

// Create a password schema
const schemaPassword = new passwordValidator();

// Add properties to it
schemaPassword
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

module.exports = schemaPassword;
