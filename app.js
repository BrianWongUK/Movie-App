const mList = document.querySelector('.movieList');
const searchfield = document.getElementById('searchField');
const mSearchForm = document.getElementById('mSearchForm');

var request = new XMLHttpRequest();
let session = [];

const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=c839b01dbf2b75c7862b82071a6277d8&language=en-US&sort_by=popularity.desc" 
const IMGPATH = "https://image.tmdb.org/t/p/w400";
const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=c839b01dbf2b75c7862b82071a6277d8&query=";



getMovie(APIURL);

//Pull data from API
async function getMovie(url){

    const respond = await fetch (url);
    const responData = await respond.json();
    Movies(responData.results);
}


function Movies (movie){

    //Clearing movie
    mList.innerHTML="";

    movie.forEach((movie) => {

        // creating a div with class "cardcontainer"
        const movieList = document.createElement('div');
        movieList.setAttribute('class','cardContainer');

        //Making all the movie data shows up onto the page
        //button on click call movieSelect function then passon the id;
        movieList.innerHTML =`    
        <a onclick="movieSelect(${movie.id})" href="#">
        <img 
        src   ="${IMGPATH + movie.poster_path}"
        />
        </a>
        <div class="cardDetail">
            <div class="mnName">
            <h4>${movie.title}</h4>
            </div>
            <div class = "Rate">
            <p>${movie.vote_average}</p>
            </div> 
        </div>
        `;

    
    // If no movie poster then just show a placeholder poster
    if(movie.poster_path === null){
        movieList.innerHTML =`    
        <a onclick="movieSelect(${movie.id})" href="#">
        <img 
        src   ="https://via.placeholder.com/150x225"
        />
        </a>
        <div class="cardDetail">
            <div class="mnName">
            <h4>${movie.title}</h4>
            </div>
        </div>
        `;
     }
     

     mList.appendChild(movieList);


    });
    
    
}


//Setting up session storage so we can get data to detail page
function SetStorage(session){
    sessionStorage.setItem('setMovie', JSON.stringify(session));
}



//Setting movie ID to session storage then go to moviedetail page
function movieSelect (movie) {
    SetStorage(movie)
    window.open("movie.html","_self")
}



//search function
mSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getMovie(SEARCH+searchfield.value);
 
});


