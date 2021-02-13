
const BookListDiv = document.querySelector("#bookCardsContainer");

const addBookButton = document.querySelector("#addBook");

let myLibrary = [];


function Book(title, author, numberPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberPages = numberPages;
    this.isRead = isRead;

    this.returnReadString = () => {
        if(this.isRead == true){
            return "read";
        } else {
            return "not read yet";
        }
    }

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.numberPages} pages, ${this.returnReadString()}.`
    }
}


function addBookToLibrary(title, author, numberPages, isRead) {
    myLibrary.push(new Book(title, author, numberPages, isRead));
}

function populateCard(card, book) {
    const cardTitle = document.createElement("h3");
    const cardAuthor = document.createElement("h3");
    const cardPages = document.createElement("h3");
    const cardRead = document.createElement("button");
    const titleAuthorDiv = document.createElement("div");
    const pagesReadDiv = document.createElement("div");


    cardTitle.classList.add("bookTitle");
    cardAuthor.classList.add("bookAuthor");
    cardPages.classList.add("bookPages");
    cardRead.classList.add("bookRead");
    titleAuthorDiv.classList.add("titleAuthorDiv");
    pagesReadDiv.classList.add("pagesReadDiv");

    cardTitle.textContent = book.title;
    cardAuthor.textContent = "by " + book.author;
    cardPages.textContent = book.numberPages + " Pages";
    cardRead.textContent = book.returnReadString();

    cardRead.addEventListener("click", () => {
        
        if(book.isRead) {
            book.isRead = false;
        } else {
            book.isRead = true;
        }
        console.log(book.returnReadString())
        console.log(book.isRead)
        updateLibrary();
    })

    titleAuthorDiv.appendChild(cardTitle);
    titleAuthorDiv.appendChild(cardAuthor);
    pagesReadDiv.appendChild(cardPages);
    pagesReadDiv.appendChild(cardRead);

    card.appendChild(titleAuthorDiv);
    card.appendChild(pagesReadDiv);
}

function updateLibrary() {
    document.querySelectorAll(".bookCard").forEach(element => {
        element.remove();
    })
    myLibrary.forEach(element => {
        const currentCard = document.createElement("div");
        currentCard.classList.add("bookCard");
        populateCard(currentCard, element)
        BookListDiv.appendChild(currentCard);
    });

    BookListDiv.style.height = (myLibrary.length * 210) + "px"
}

function showAddBookScreen() {
    const opacityMask = document.createElement("div");
    opacityMask.classList.add("opacityMask")
    document.body.appendChild(opacityMask);
}

addBookButton.addEventListener("click", showAddBookScreen)

updateLibrary()
