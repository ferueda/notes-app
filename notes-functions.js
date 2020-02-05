'use strict';

// read notes from localStorage

const getSavedNotes = function() {
  const notesJSON = localStorage.getItem('notes');

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save notes to localStorage

const saveNotesToLocalStorage = function(notes) {
  return localStorage.setItem('notes', JSON.stringify(notes));
};

// remove notes

const removeNote = function(id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) notes.splice(noteIndex, 1);
};

// generate the DOM structure for a noteS

const generateNote = function(note) {
  const noteContainer = document.createElement('a');
  const p = document.createElement('p');
  const date = document.createElement('p');

  // setup the note title text
  if (note.title.length > 0) {
    p.textContent = note.title;
  } else p.textContent = 'No title note';

  p.classList.add('list-item__title');

  noteContainer.appendChild(p);
  noteContainer.href = `edit.html#${note.id}`;
  noteContainer.classList.add('list-item');
  // setup the note's date

  date.textContent = generateLastEdited(note.updatedAt);
  date.classList.add('list-item__subtitle');
  noteContainer.appendChild(date);

  return noteContainer;
};

// sort notes

const sortNotes = function(notes, sortBy) {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === 'byName') {
    return notes.sort((a, b) => {
      if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
      else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
      else return 0;
    });
  }
};

// Render notes

const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.includes(filters.searchText));
  const container = document.querySelector('#notes-container');

  container.innerHTML = '';

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => container.appendChild(generateNote(note)));
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show';
    emptyMessage.classList.add('empty-message');
    container.appendChild(emptyMessage);
  }
};

// updates edited date

const generateLastEdited = function(timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
