const path = require("path");
const fs = require("fs");
const Notes = require("./db/notes");
const router = require("express").Router();


  router.get("/notes", function(req, res) {
    Notes.getAllNotes().then(notes => {
      console.log(notes)
      res.json(notes)}).catch(err => res.status(500).json(err))
  });


  router.post("/notes", function(req, res) {
    Notes.addNote(req.body).then(note => res.json(note)).catch(err => res.status(500).json(err))
  });

  router.delete("/notes/:id", function(req, res) {
    Notes.removeNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err))
  });


module.exports = router;