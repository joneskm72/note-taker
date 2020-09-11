const fs = require("fs");
const util = require("util");
const { v1: uuidv1 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes{
  read(){
    return readFileAsync("db/db.json", "utf-8")
  }
  write(note){
    return writeFileAsync("db/db.json", JSON.stringify(note))
  }

  getAllNotes() {
    return this.read().then(function(notes) {
      let readNotes;
      try {
        readNotes = [].concat(JSON.parse(notes))
      } catch (error) {
        readNotes = []
      }
      return readNotes;
    })
  }

  addNote(note){
    const newNote = {
      title: note.title,
      text: note.text,
      id: uuidv1()
    }

    return this.getAllNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes))
  }
  removeNote(id) {
    return this.getAllNotes().then(notes => notes.filter(note => note.id !== id)).then(filteredNotes => this.write(filteredNotes))
  }
}

module.exports = new Notes()