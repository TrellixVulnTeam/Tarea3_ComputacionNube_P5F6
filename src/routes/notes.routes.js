const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        renderNotes, 
        renderEditForm, 
        updateNote, 
        deleteNote 
    } = require('../controllers/notes.controller');

const { isLogged } = require('../helpers/auth');

router.get('/notes/add', isLogged, renderNoteForm);
router.post('/notes/new-note', isLogged, createNewNote);

router.get('/notes', isLogged, renderNotes); 

router.get('/notes/edit/:id', isLogged, renderEditForm);

router.put('/notes/edit/:id', isLogged, updateNote);

router.delete('/notes/delete/:id', isLogged, deleteNote);


module.exports = router;