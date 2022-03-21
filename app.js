const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const addBook = document.getElementById('add')
const books = document.querySelector('.books')



//variables
const booksArr = getBooks()
let i = 0
let id = Date.now()

//Event Listeners

addBook.addEventListener('click', (e) => {
    e.preventDefault()

    if(title.value === '' || author.value === '' || pages.value === ''){
        showMessage('Please fill in all fields', 'error')
    }else{
        const book = new Book(id,title.value, author.value, pages.value)

        addBooksToLibrary(book)
        addBooksToScreen()
        showMessage('Book added', 'success')
        resetFields()
           
    }

   
})

booksArr.forEach(book => addBooksToScreen(book))


books.addEventListener('click', (e) =>{
    let item = e.target

    if(item.classList.contains('delete')){
        item.parentElement.remove()
        showMessage('Book removed', 'success')
        removeBook(e.target.previousElementSibling.textContent)
       
    }

       
})

books.addEventListener('change', (e) =>{
    let item = e.target

    if(item.classList.contains('readStatus')){
        if(item.value === 'read'){
         item.parentElement.parentElement.style.borderBottomColor = 'rgb(34,163,214)' 
         
        }else if(item.value === 'unread'){
         item.parentElement.parentElement.style.borderBottomColor = 'red' 
         
        }
     }
   

       
})


// Construtor

function Book(id,title,author,pages,status){
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}


//Functions

function resetFields(){
    title.value = ''
    author.value = ''
    pages.value = ''
}

function addBooksToScreen(){
    
    const bookEntry = document.createElement('div')
    bookEntry.classList.add('book')

    bookEntry.innerHTML = `
    <h3>Title: <span>${booksArr[i].title}</span></h3>
    <h3>Author: <span>${booksArr[i].author}</span></h3>
    <h3>Pages: <span>${booksArr[i].pages}</span></h3>
    id<h3>${booksArr[i].id}</h3>
    <button id='delete' class='delete'>Delete</button>
    <div class="status">
       
       
    <select class="readStatus">
    <option value="read">Read</option>
    <option value="unread">Unread</option>
    </select>
    </div>
    `
    
   i++
  
    books.appendChild(bookEntry)

}


function showMessage(message, className){
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#inputs')
    container.insertBefore(div, form)

    setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

function addBooksToLibrary(book){
    
    booksArr.push(book)
    localStorage.setItem('books', JSON.stringify(booksArr))
}

function getBooks(){
    let books

    if(localStorage.getItem('books') === null){
        books = []
    }else{
        books = JSON.parse(localStorage.getItem('books'))
    }

    return books
}

function removeBook(id){
    const books = getBooks()

    books.forEach((book, index) =>{
        if(book.id == id){
            books.splice(index, 1)
           
        }
        
    })
    
    localStorage.setItem('books', JSON.stringify(books))
    
}


