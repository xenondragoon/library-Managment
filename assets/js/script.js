const bookShelf = document.querySelector("main");
const filter = document.querySelector(".filter");
const share = document.querySelector(".share");
const addBookBtn = document.querySelector(".add-book");
const addBookForm = document.querySelector("form");
const filterForm = document.querySelector("header>.filter-form");
const search = document.querySelector(".search>input[type='search']");
const booksJson =
  "https://raw.githubusercontent.com/benoitvallon/100-best-books/refs/heads/master/books.json";

const Books = [];
fetch(booksJson)
  .then((blob) => blob.json())
  .then((data) => {
    Books.push(...data);
    addBookToShelf(Books);
  });

function toggleVisibility(element) {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

function addBookToArray(arr) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  let book = new Book(title, author, pages);

  Books.push(book);
}

function addBookToShelf(arr) {
  bookShelf.innerHTML = "";
  arr.forEach((index) => {
    bookShelf.innerHTML += `
    <div class="book">
        <div class="book-info">
          <img
            src="assets/image/book-closed-svgrepo-com.svg"
            alt="image of a book"
            width="100px"
            height="100px"
          />
          <div>
            <p>Title: ${index.title}</p>
            <p>Author: ${index.author}</p>
            <p>Pages: ${index.pages}</p>
            <p>Year: ${index.year}</p>
          </div>
        </div>
        <div class="book-setting">
          <button>Read</button>
          <img src="assets/image/favorite.svg" alt="favorite icon" />
        </div>
      </div>
    `;
  });
}

function searchBook(wordToMatch) {
  const filteredArr = Books.filter((book) => {
    const regex = new RegExp(wordToMatch, "gi");
    return book.author.match(regex) || book.title.match(regex);
  });
  addBookToShelf(filteredArr);
}

addBookBtn.addEventListener("click", () => toggleVisibility(addBookForm));
search.addEventListener("input", () => searchBook(search.value));
filter.addEventListener("click", () => toggleVisibility(filterForm));

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToArray(Books);
  addBookToShelf(Books);
});
