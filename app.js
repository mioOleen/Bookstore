const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('addBtn');

function getBooks() {
  return JSON.parse(localStorage.getItem('books')) || [];
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = '';
  const books = getBooks();

  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    const titleSection = document.createElement('p');
    titleSection.innerText = book.title;
    const authorSection = document.createElement('p');
    authorSection.innerText = book.author;
    bookDiv.append(titleSection);
    bookDiv.append(authorSection);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('removeButton');
    /* eslint-disable */
    removeBtn.onclick = () => removeBook(index);
    /* eslint-enable */
    bookDiv.append(removeBtn);

    const line = document.createElement('hr');
    bookDiv.append(line);

    bookContainer.append(bookDiv);
  });
}
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    const newBook = { title, author };
    const existingBooks = getBooks();
    existingBooks.push(newBook);
    saveBooks(existingBooks);

    titleInput.value = '';
    authorInput.value = '';
    displayBooks();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter title and author');
  }
}

function removeBook(index) {
  const existingBooks = getBooks();
  const updatedBooks = existingBooks.filter((book, currentIndex) => currentIndex !== index);
  saveBooks(updatedBooks);
  displayBooks();
}

displayBooks();
addButton.addEventListener('click', addBook);
