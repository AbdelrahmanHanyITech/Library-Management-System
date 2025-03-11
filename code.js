
let books = [
    { id: 1, title: "Nader Fouda", author: "Ahmed Younis", isBorrowed: false, dueDate: null },
    { id: 2, title: "Utopia", author: "Ahmed Khaled Tawfik", isBorrowed: true, dueDate: getFutureDate(7) },
    { id: 3, title: "Zikola Land", author: "Amr Abdel Hamid", isBorrowed: false, dueDate: null },
    { id: 4, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isBorrowed: true, dueDate: getFutureDate(7) },
    { id: 5, title: "Ecadoli", author: "Hanan Lashin", isBorrowed: false , dueDate: null},
    { id: 6, title: "Valley of the Forgotten Wolves - Zikola Land 3", author: "Amr Abdel Hamid", isBorrowed: true , dueDate: getFutureDate(7) }
];

window.onload = updateBookTable;

function updateBookTable() {
    let tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";
    
    books.forEach(book => {
        let row = document.createElement("tr");

        row.className = book.isBorrowed ? "table-warning" : "table-success";

        let statusText = book.isBorrowed ? `Borrowed (Due: ${book.dueDate})` : "Available";

        if (book.isBorrowed && new Date(book.dueDate) < new Date()) {
            row.className = "table-danger";  
            statusText = `Overdue! (Due: ${book.dueDate})`;
        }

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${statusText}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addBook() {
    let id = parseInt(document.getElementById("bookId").value);
    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;

    if (!id || !title || !author) {
        alert("Please fill all fields!");
        return;
    }

    if (books.some(book => book.id === id)) {
        alert("Book ID already exists! Please enter a unique ID.");
        return;
    }

    books.push({ id, title, author, isBorrowed: false, dueDate: null });
    updateBookTable();
}

function borrowBook() {
    let id = parseInt(document.getElementById("bookIdAction").value);
    let book = books.find(b => b.id === id);
    
    if (book) {
        if (book.isBorrowed) {
            alert("This book is already borrowed!");
            return;
        }
        book.isBorrowed = true;
        book.dueDate = getFutureDate(7);
        updateBookTable();
    } else {
        alert("Book not found!");
    }
}

function returnBook() {
    let id = parseInt(document.getElementById("bookIdAction").value);
    let book = books.find(b => b.id === id);
    
    if (book) {
        if (!book.isBorrowed) {
            alert("This book is already available!");
            return;
        }
        book.isBorrowed = false;
        book.dueDate = null;
        updateBookTable();
    } else {
        alert("Book not found!");
    }
}

function getMostBorrowedAuthor() {
    let authorCounts = {};

    books.forEach(book => {
        if (book.isBorrowed) {
            if (!authorCounts[book.author]) {
                authorCounts[book.author] = 0;
            }
            authorCounts[book.author]++;
        }
    });

    let mostBorrowedAuthor = "None";
    let maxCount = 0;

    for (let author in authorCounts) {
        if (authorCounts[author] > maxCount) {
            maxCount = authorCounts[author];
            mostBorrowedAuthor = author;
        }
    }

    return mostBorrowedAuthor;
}

function generateReport() {
    let total = books.length;
    let borrowed = books.filter(book => book.isBorrowed).length;
    let available = total - borrowed;
    let overdueBooks = books.filter(book => book.isBorrowed && new Date(book.dueDate) < new Date()).length;
    let mostBorrowedAuthor = getMostBorrowedAuthor(); // Call the fixed function

    alert(`Total Books: ${total}\nBorrowed: ${borrowed}\nAvailable: ${available}\nOverdue Books: ${overdueBooks}\nMost Borrowed Author: ${mostBorrowedAuthor}`);
}


function getFutureDate(days) {
    let date = new Date();
    date.setDate(date.getDate() + days); 
    return date.toISOString().split('T')[0]; 
}


function searchBooks() {
     let query = document.getElementById("searchQuery").value.toLowerCase();
     let results = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
 
     let list = document.getElementById("searchResults");
     list.innerHTML = "";
 
     if (results.length > 0) {
         results.forEach(book => {
             let li = document.createElement("li");
             li.textContent = `${book.id}: ${book.title} by ${book.author} ${book.isBorrowed ? "(Borrowed)" : "(Available)"}`;
             list.appendChild(li);
         });
     } else {
         list.innerHTML = "<li>No books found</li>";
     }
 }
 
 function updateAvailableBooks() {
     let list = document.getElementById("availableBooks");
     list.innerHTML = "";
 
     books.filter(book => !book.isBorrowed).forEach(book => {
         let li = document.createElement("li");
         li.textContent = `${book.id}: ${book.title} by ${book.author}`;
         list.appendChild(li);
     });
 }