const Note = require("../models/Note");

exports.getOneNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => res.status(200).json(note))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllNotes = (req, res, next) => {
  Note.find()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createNote = (req, res, next) => {
  const noteObject = req.body;
  delete noteObject._id;

  const note = new Note({
    ...noteObject,
  });
  note
    .save()
    .then(() => {
      res.status(201).json({ message: "Note added !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateNote = (req, res, next) => {
  const noteId = req.params.id;
  const noteObject = req.body;

  Note.findOne({ _id: noteId })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      Note.updateOne({ _id: noteId }, { ...noteObject, _id: noteId })
        .then(() => {
          res.status(200).json({ message: "Note modified!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error modifying note" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding note" });
    });
};

exports.deleteNote = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then(() => {
      Note.deleteOne({ _id: req.params.id })
        .then(() => {
          (err) => {
            if (err) console.log(err);
            else {
              res.status(200).json({ message: "note deleted !" });
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
