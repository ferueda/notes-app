'use strict'

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

if (!note) location.assign('index.html');

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const body = document.querySelector('body');
const lastEdited = document.querySelector('#last-edited');

noteTitle.value = note.title;
noteBody.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);

noteTitle.addEventListener('input', e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = generateLastEdited(note.updatedAt);
  saveNotesToLocalStorage(notes);
});

noteBody.addEventListener('input', e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = generateLastEdited(note.updatedAt);
  saveNotesToLocalStorage(notes);
});

const delBtn = document.querySelector('#remove-note');

delBtn.addEventListener('click', () => {
  removeNote(noteId);
  saveNotesToLocalStorage(notes);
  location.assign('index.html');
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);

    if (!note) location.assign('index.html');

    noteTitle.value = note.title;
    noteBody.value = note.body;
    lastEdited.textContent = generateLastEdited(note.updatedAt);
  }
});