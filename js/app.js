 document.getElementById('spinner').style.display = 'none';
 document.getElementById('error-message').style.display = 'none';
const searchBook = () =>{
    const searchField = document.getElementById('search-input');
    const searchText =searchField.value;
    // clear input value
    searchField.value ="";
// handle empty text 
if(searchText === ""){
// error handle
displayError();
}
else{
  // spiner block when click search
document.getElementById('spinner').style.display = 'block';
// Hide error
document.getElementById('error-message').style.display = 'none';
// hide previous result
document.getElementById('book-container').textContent ="";
// hide book found when search
document.getElementById('total-book').innerText ="";
    const url=`https://openlibrary.org/search.json?q=${searchText}`
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data => displayBookResult(data))
};
};
// display error
const displayError = () => {
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('book-container').textContent = '';
  document.getElementById('total-book').innerText="";
}
// display boook
const displayBookResult =(books) =>{

  console.log(books.numFound);
  // hide spinner
  // document.getElementById('spinner').style.display = 'none';
// console.log(books);
const bookContainer = document.getElementById('book-container');
bookContainer.textContent ="";
const bookList = books.docs;

if(bookList == null){
  displayError();
}
else if(!bookList.length > 0){

  document.getElementById('total-book').innerText=`no result found`;
  document.getElementById('spinner').style.display = 'none';
 document.getElementById('error-message').style.display = 'none';

}
  


else{
  document.getElementById('total-book').innerText=`Book-found ${bookList.length}  out of ${books.numFound}`
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('error-message').style.display = 'none';
  // display each book in a card
  bookList.forEach(book =>{
      // console.log(book);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML =`
      <div class="card">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="..." />
      <div class="card-body">
        <h3 class="card-title">Book-Name:${book.text[1]}</h3>
        <h4>Book-publisher:${book.publisher}</h4>
        <h5>Author Name:Author-Name ${book.author_name?.[0]}</h5>
        <h6>published  Year :${book.first_publish_year}</h6>
        <p class="card-text">
      
        </p>
      </div>
    </div>
      `;
      bookContainer.appendChild(div);
  })
}
}





