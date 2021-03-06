const mList = document.querySelector('.movieContainer');
var request = new XMLHttpRequest();
let session = [];
let genresArr = [];
const postBack = document.querySelector('.movieContainer')

const IMGPATH = "https://image.tmdb.org/t/p/w400";

const prodImg = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"

getMovie();

async function getMovie(){
    getSesMovie();
    const respond = await fetch ("https://api.themoviedb.org/3/movie/" + session + "?api_key=c839b01dbf2b75c7862b82071a6277d8&language=en-GB");
    const respondData = await respond.json();
    const IMGPATH = "https://image.tmdb.org/t/p/w1920";
    movieData(respondData);
    console.log(respondData)
}

//getting movie detail on to the page
function movieData (movie){
    const movieList = document.createElement('div');
    movieList.setAttribute('class','contentWrapper');
    let date = movie.release_date

 //making sure it's displaying the right date format   
    let tdate = new Date(date);
    const uear = tdate.toLocaleString();
    wuear = uear.split(', ')[0];

//looping genre from api and pusing it to an arry
    movie.genres.forEach((genre) => {
        if (genre.name) {
          genresArr.push(genre.name);
        }
    });

    //getting background image
    postBack.style.backgroundImage = `url(${prodImg + movie.backdrop_path})`;
    postBack.css

    movieList.innerHTML =`  
    <div class="image"> 
    <img 
    src  ="${IMGPATH + movie.poster_path}"
    />
    </div>
    <div class="discriptionWrapper">
        <div class="title">
            <h1>${movie.title}</h1>
             <p>${wuear} [US] . ${genresArr}</p>
            </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p> 
        </div>
    </div>
    `;
    mList.appendChild(movieList);

}

//Get movie from session
function getSesMovie(){
    reference = sessionStorage.getItem('setMovie');
    session= JSON.parse(reference);
}





