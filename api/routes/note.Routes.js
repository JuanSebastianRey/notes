const express = require('express');
const noteController = require('../controller/noteController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, noteController.createNote);
router.get('/', auth, noteController.getNotes);
router.get('/:id', auth, noteController.getNote);
router.patch('/:id', auth, noteController.updateNote);
router.delete('/:id', auth, noteController.deleteNote);

module.exports = router;