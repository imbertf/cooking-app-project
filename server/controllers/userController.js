const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((term) => res.status(200).json(term))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createUser = (req, res, next) => {
  const userObject = req.body;
  delete userObject._id;
  console.log(req.body);

  const user = new User({
    ...userObject,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User added !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Create new user account calling hash function from bcrypt
// asunc function that callback Promise with generated hash
// create and save user in database
exports.signup = (req, res, next) => {
  console.log(req.body.password);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "New user created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Allow connexion to user account
// verify if mail provided by user exist in database
// compare funtion from bcrypt compare password provided by user with the one present in database
// if password exist send back 200 response with user ID and TOKEN
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User does not exist !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Wrong password !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "1h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateLogStatus = (req, res, next) => {
  const userEmail = req.body.email;
  const userObject = { ...req.body };

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      User.updateOne({ email: userEmail }, { ...userObject, email: userEmail })
        .then(() => {
          res.status(200).json({ message: "User logging status modified!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error changing logging status " });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding user" });
    });
};
