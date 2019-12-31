// read notes from localStorage

const getSavedNotes = function () {
  const notesJSON = localStorage.getItem('notes');
  if (notesJSON) return JSON.parse(notesJSON);
  else return [];
};

// save notes to localStorage

const saveNotesToLocalStorage = function (notes) {
  return localStorage.setItem('notes', JSON.stringify(notes));
};

// remove notes

const removeNote = function (id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) notes.splice(noteIndex, 1);
};

// generate the DOM structure for a note

const generateNote = function (note) {
  const noteContainer = document.createElement('div');
  const p = document.createElement('a');
  const delBtn = document.createElement('button');
  const date = document.createElement('span');

  //setup remove note btn
  delBtn.textContent = 'x';
  noteContainer.appendChild(delBtn);
  delBtn.addEventListener('click', () => {
    removeNote(note.id);
    saveNotesToLocalStorage(notes);
    renderNotes(notes, filters);
  });

  // setup the note title text
  if (note.title.length > 0) {
    p.textContent = note.title;
  } else p.textContent = 'No title note';
  p.href = `edit.html#${note.id}`;
  noteContainer.appendChild(p);

  // setup the note's date

  date.textContent = generateLastEdited(note.updatedAt);
  noteContainer.appendChild(date);

  return noteContainer;
};

// sort notes

const sortNotes = function (notes, sortBy) {
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

const renderNotes = function (notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.includes(filters.searchText));
  const container = document.querySelector('#notes-container');

  container.innerHTML = '';

  filteredNotes.forEach(note => container.appendChild(generateNote(note)));
};

// updates edited date

const generateLastEdited = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
