function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead === true ? "Read" : "Not Read Yet"; 
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead === true ? "read" : "not read yet"}` 
    }
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

const myLibrary = [theHobbit];

function addBookToLibrary() {
    let title = prompt('Enter book title');
    let author = prompt('Enter book author');
    let pages = prompt('Enter book pages');
    let isRead = prompt('Enter True or False if you read the book');
    let dynamicObject = new Book(title, author, pages, isRead);

    myLibrary.push(dynamicObject);
}


const books = document.querySelector('.books');

function displayBooks() {
    const book = document.createElement('div');
    myLibrary.forEach(element => {
        book.className = book;
        const bookTitle = document.createElement('p');    
        const bookAuthor = document.createElement('p');    
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('p');
        bookTitle.textContent = "Title: " + element.title; 
        bookAuthor.textContent = "Author: " + element.author; 
        bookPages.textContent = "Pages: " + element.pages; 
        bookRead.textContent = "Status: " + element.isRead;
        book.appendChild(bookTitle);
        book.appendChild(bookAuthor);
        book.appendChild(bookPages);
        book.appendChild(bookRead);
        book.classList.add('book-style');
        books.appendChild(book);
    });
}

displayBooks();

const bookModal = document.getElementById('bookModal');
const addBook = document.getElementById('addBook');
const add = document.getElementById('add');

addBook.addEventListener('click', function() {
    bookModal.showModal();
    bookModal.classList.add('show');
});
function exitModal() {
    bookModal.close();
    bookModal.classList.remove('show');
}
add.addEventListener('click', exitModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      exitModal();
    }
});