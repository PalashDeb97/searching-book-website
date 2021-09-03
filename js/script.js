
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const bookShow = document.getElementById('book-show');
const resultStats = document.getElementById('result-stats');
const spinner = document.getAnimations('spinner');
const error = document.getElementById('error');

searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    bookShow.innerHTML = '';
    searchInput.value = '';
    
    if (searchText === '') {
      error.innerText = 'ভাই কিছু একটা লিখে তারপর Search এ ক্লিক করেন ';
      resultStats.innerText = '';
      return;
    }

    error.innerText = '';

    fetch(url)
        .then((res) => res.json())
        .then((books) => {
          displayBook(books);
        });
})

function displayBook(books) {
    // results number
    resultStats.innerText = `About ${books.numFound} results.`;
    
    // error
    if (books.numFound === 0) {
      error.innerText = 'ভাই আপনি যেই নামের বই খুঁজতেছেন তা আমাদের এখানে নেই ভবিষ্যতে আনার চেষ্টা কররো';
      resultStats.innerText = '';
      return;
    };

    books?.docs.forEach((book) => {
        // cover img
        book?.cover_i
          ? (thumbnail = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`)
          : (thumbnail = "images/error.png");
  
        // author naame
        book?.author_name ? (auth = book?.author_name.join()) : (auth = "not available");

        // publisher naame
        book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = "not available");

        // publish date
        book?.publish_date[0] ? (publishDate = book?.publish_date[0]) : (publishDate = "not available");

        // create div
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <div class="card m-2" style="width: 18rem;">
                <img src="${thumbnail}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${book?.title}</h5>
                    <h6 class="card-text">Author:  <span class ="text-secondary"> ${auth} </span></h6>
                     <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                     <p class="card-text">Published: <span class ="text-secondary">  ${publishDate} </span> </p>
                    <button class="btn btn-danger">Show Details </button>
                </div>
            </div>
        `;
        bookShow.appendChild(div);
        
      });
};
