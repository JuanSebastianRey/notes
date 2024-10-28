const Note = require('../model/note.model');

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      user: req.user._id
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.send(notes);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send();
  }
};

exports.updateNote = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'content'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    updates.forEach((update) => note[update] = req.body[update]);
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) {
      res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send();
  }
};