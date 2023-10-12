const Term = require("../models/Term");

exports.getOneTerm = (req, res, next) => {
  Term.findOne({ _id: req.params.id })
    .then((term) => res.status(200).json(term))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllTerms = (req, res, next) => {
  Term.find()
    .then((terms) => {
      res.status(200).json(terms);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createTerm = (req, res, next) => {
  const termObject = req.body;
  delete termObject._id;
  console.log(req.body);

  const term = new Term({
    ...termObject,
  });
  term
    .save()
    .then(() => {
      res.status(201).json({ message: "Term added !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateTerm = (req, res, next) => {
  console.log(req.body);
  const termId = req.params.id;
  const termObject = { ...req.body };

  Term.findOne({ _id: termId })
    .then((term) => {
      if (!term) {
        return res.status(404).json({ error: "Term not found" });
      }

      Term.updateOne({ _id: termId }, { ...termObject, _id: termId })
        .then(() => {
          res.status(200).json({ message: "Term modified!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error modifying term" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding term" });
    });
};

exports.deleteTerm = (req, res, next) => {
  Term.findOne({ _id: req.params.id })
    .then((term) => {
      Term.deleteOne({ _id: req.params.id })
        .then(() => {
          (err) => {
            if (err) console.log(err);
            else {
              res.status(200).json({ message: "term deleted !" });
            }
          };
        })
        .catch((error) => {
          console.log(error);
          res.status(401).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
