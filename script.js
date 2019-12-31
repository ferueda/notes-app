let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited'
};

document.querySelector('#search-input').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#create-note-btn').addEventListener('click', () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveNotesToLocalStorage(notes);
  location.assign(`edit.html#${id}`);
});

document.querySelector('#sort-notes').addEventListener('change', e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

renderNotes(notes, filters);
