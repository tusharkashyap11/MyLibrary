function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead; 
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead === true ? "read" : "not read yet"}` 
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, isRead) {
    let dynamicObject = new Book(title, author, pages, isRead);
    myLibrary.push(dynamicObject);
    displayBooks();
}

function toggleRead(title) {
    myLibrary.forEach(element => {
        if (element.title === title) {
            element.toggleReadStatus();
        }
    });
}

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
}

const books = document.querySelector('.books');

function displayBooks() {
    const book = document.createElement('div');
    const bookTitle = document.createElement('p');    
    const bookAuthor = document.createElement('p');    
    const bookPages = document.createElement('p');
    const br = document.createElement('br');
    const bookRead = document.createElement('button');
    const bookRemove = document.createElement('button');
    bookTitle.textContent = "Title: " + myLibrary[myLibrary.length - 1].title; 
    bookAuthor.textContent = "Author: " + myLibrary[myLibrary.length - 1].author; 
    bookPages.textContent = "Pages: " + myLibrary[myLibrary.length - 1].pages; 
    bookRead.textContent = (myLibrary[myLibrary.length - 1].isRead === true ? "Read" : "Not Read Yet");
    bookRead.classList.add('read-status')
    bookRemove.textContent = "Remove";
    bookRemove.classList.add('remove');
    bookRemove.setAttribute('data-index', myLibrary.length - 1);
    bookRead.addEventListener('click', function() {
        // myLibrary[bookRemove.getAttribute('data-index')].isRead = !myLibrary[bookRemove.getAttribute('data-index')].isRead; (without prototype).
        toggleRead(myLibrary[bookRemove.getAttribute('data-index')].title);
        bookRead.textContent = (myLibrary[bookRemove.getAttribute('data-index')].isRead === true ? "Read" : "Not read yet");
    })
    bookRemove.addEventListener('click', function() {
        book.parentNode.removeChild(book);
        myLibrary.splice(bookRemove.getAttribute('data-index'), 1);
    })
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    book.appendChild(br);
    book.appendChild(bookRemove);
    books.appendChild(book);
    book.classList.add('book-style');
}

const bookModal = document.getElementById('bookModal');
const addBook = document.getElementById('addBook');
const add = document.getElementById('add');

addBook.addEventListener('click', function() {
    bookModal.showModal();
    bookModal.classList.add('show');
});
function exitModal(event) {
    event.preventDefault();

    var title = document.getElementById('book_title').value;
    var author = document.getElementById('book_author').value;
    var pages = document.getElementById('book_pages').value;
    var bookStatus = document.getElementById('book_status');
    var isRead = bookStatus.checked;
    if (myLibrary.some(item => { return item.title === title })) {
        document.getElementById('errorMessage').textContent = 'This book is already present in library.';
    } else { 
        document.getElementById('errorMessage').textContent = '';
        addBookToLibrary(title, author, pages, isRead);   
        bookModal.close();
        bookModal.classList.remove('show');
    }

}
add.addEventListener('click', exitModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        bookModal.close();
        bookModal.classList.remove('show');
    }
});
