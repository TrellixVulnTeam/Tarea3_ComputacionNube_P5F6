const nodemon = require("nodemon");

const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/newNote')
}

notesCtrl.createNewNote = async (req, res) => {
    const {titulo, descripcion} = req.body;
    const newNote = new Note({titulo, descripcion});
    newNote.usuario = req.user.id;
    await newNote.save();
    req.flash('mensajeExito', 'La nota se agrego correctamente');
    res.redirect('/notes');
}

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({usuario : req.user.id}).sort({createdAt : 'desc'});
    res.render('notes/allNotes', {notes});
}

notesCtrl.renderEditForm = async (req, res) => {
    const notaEditar = await Note.findById(req.params.id);
    if (notaEditar.usuario != req.user.id) {
        req.flash('mensajeError', 'No autorizado')
        return res.redirect('/notes');
    }
    res.render('notes/editarNota', {notaEditar});
}

notesCtrl.updateNote = async (req, res) => {
    const { titulo, descripcion } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {titulo, descripcion});
    req.flash('mensajeExito', 'La nota se ha actualizado correctamente');
    res.redirect('/notes');
}

notesCtrl.deleteNote =  async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('mensajeExito', 'La nota fue eliminada');
    res.redirect('/notes');
}

module.exports = notesCtrl;