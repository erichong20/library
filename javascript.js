let myLibrary = [];
let library = document.querySelector(".library");
let newBook = document.querySelector(".newBook");

//form
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".form__close");
const submitBtn = document.querySelector(".form__submit");
const titleInput = document.querySelector(".form__input--title");
const authorInput = document.querySelector(".form__input--author");
const pagesInput = document.querySelector(".form__input--pages");
const checkYes = document.querySelector(".form__radio--read");
const checkNo = document.querySelector(".form__radio--notRead");
const formInputFields = document.querySelectorAll(".form__input");
const formInputRadios = document.querySelectorAll(".form__radio");
const form = document.querySelector(".form");


function Book(title,author,pages,hasRead) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title,author,pages,hasRead) {
    let book = new Book(title,author,pages,hasRead);
    myLibrary.push(book);
}

function renderLibrary(){

    library.innerHTML="";
    for (let i = 0; i<myLibrary.length; i++) {
        //if the book is not already rendered, add a div for it
        //and place it in the library div
        renderBook(myLibrary[i]);
        if (document.querySelector(`.${myLibrary[i].title.split(" ").join("-")}`) !== null){
            
        }
    }
}

function renderBook(book){
    let bookDiv = document.createElement("div");
    bookDiv.classList.add(book.title.split(" ").join("-"));
    bookDiv.classList.add("book");
    bookDiv.dataset.id = myLibrary.indexOf(book);

    //add the title div
    let titleDiv = document.createElement("div");
    titleDiv.innerHTML = book.title;

    //add the author div
    let authorDiv = document.createElement("div");
    authorDiv.innerHTML = book.author;

    //add the pages div
    let pagesDiv = document.createElement("div");
    pagesDiv.innerHTML = book.pages;

    
    //add the checkBox for hasRead
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    //if the book has been read, add the class that shows the button as red/green
    if(book["hasRead"]){
        checkBox.checked = true;
    } else {
        checkBox.checked = false;
    }

    //add delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("book__delete");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.addEventListener('click', function(e){
        let bookToRemove = e.target.parentNode;
        myLibrary.splice(parseInt(bookToRemove.dataset.id), 1);
        renderLibrary();
    })

    //listening for changes
    checkBox.addEventListener('change', function() {
        if(this.checked){
            book.hasRead = true;
        } else {
            book.hasRead = false;
        }
    })

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(checkBox);
    bookDiv.appendChild(deleteBtn);

    library.appendChild(bookDiv);
}

newBook.addEventListener("click",function (){
    modal.style.display = "block";
})

closeBtn.addEventListener("click", function (){
    modal.style.display = "none";
})

form.addEventListener("submit", function(e) {
    e.preventDefault();
    modal.style.display = "none";
    if (checkYes){
        addBookToLibrary(titleInput.value,authorInput.value,pagesInput.value,true);
    } else {
        addBookToLibrary(titleInput.value,authorInput.value,pagesInput.value,false);
    }
    renderLibrary();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    Array.from(formInputFields).forEach(function(inputField) {
        inputField.value = "";
    })
    Array.from(formInputRadios).forEach(function(radio) {
        radio.checked = false;
    })
})

addBookToLibrary("harry potter","jk rowling",339,true);
addBookToLibrary("eragon","chistopher paolini",567,true);

renderLibrary();