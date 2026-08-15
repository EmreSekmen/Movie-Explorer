const movieContainer = document.querySelector("#movie-container")
const searchinput = document.querySelector("#searchinput")
const noResultMessage = document.querySelector("#noResults")

const MovieModal = document.querySelector("#movie-modal")

const modalTitle = document.querySelector("#modal-title")
const modalCategory = document.querySelector("#modal-category")
const modalRating = document.querySelector("#modal-rating")
const modalDescription = document.querySelector("#modal-description")
const modalImage = document.querySelector("#modal-image")
const modalDirector = document.querySelector("#modal-director")
const modalSequel = document.querySelector("#modal-sequel")
const SequelImage = document.querySelector("#sequel-image")

const sequelContainer = document.querySelector("#sequel-container")

const favoriteButton = document.querySelector("#favorite-button")
const watchedButton = document.querySelector("#watched-button")
const wantToWatchButton = document.querySelector("#wanttowatcht-button")

const allMoviesBtn = document.querySelector("#allMovies-button")
const myFavoriteBtn = document.querySelector("#myFavorite-button")
const watchedBtn = document.querySelector("#myWatched-button")
const WatchListBtn = document.querySelector("#myWantToWatch-button")


const closeModal = document.querySelector("#close-modal")








function movieRenderer(movieList) {

   movieList.forEach(place => {

      const card = document.createElement("div")
      card.classList.add("movieCard")

      const img = document.createElement("img")
      img.src = place.image

      const info = document.createElement("div")
      info.classList.add("info")

      const title = document.createElement("h4")
      title.textContent = place.name

      const category = document.createElement("p")
      category.textContent = place.category

      const rating = document.createElement("div")
      rating.classList.add("rating")

      const imdb = document.createElement("p")
      imdb.classList.add("imdb-rating")

      imdb.textContent = "IMDb: Loading..."



      rating.textContent = place.rating

      info.appendChild(title)
      info.appendChild(imdb)
      info.appendChild(category)
      info.appendChild(rating)

      card.appendChild(img)
      card.appendChild(info)


      movieContainer.appendChild(card)


      getMovieRating(place.imdbId).then(imdbRating => {

         imdb.textContent = imdbRating
            ? `⭐: ${imdbRating}`
            : "⭐: N/A";

      })







      card.addEventListener("click", () => {
         openModal(place)
      })





   })

}

let currentMovie;

function openModal(movie) {

   currentMovie = movie;




   modalTitle.textContent = movie.name;
   modalCategory.textContent = movie.category;
   modalDescription.textContent = movie.description;
   modalImage.src = movie.image
   modalDirector.textContent = movie.director
   modalSequel.textContent = movie.sequel
   SequelImage.src = movie.sequelImage


   getMovieRating(movie.imdbId).then(imdbRating => {
      modalRating.textContent = `⭐${imdbRating}`
   })

   getMovieDescription(movie.imdbId).then(plot => {
      modalDescription.textContent = `${plot}`
   })

   if (movie.sequelİd) {

      sequelContainer.style.display = "block";

      modalSequel.textContent = movie.sequel;
      SequelImage.src = movie.sequelImage;


   }
   else {
      sequelContainer.style.display = "none";

   }
   MovieModal.classList.add("active")
}

SequelImage.addEventListener("click", () => {

   const sequelMovie = movies.find(movie => movie.id == currentMovie.sequelİd)


   openModal(sequelMovie)



})



closeModal.addEventListener("click", () => {
   MovieModal.classList.remove("active")
})

movieRenderer(movies)


searchinput.addEventListener("input", () => {

   const filteredMovies = movies.filter(movie => {
      return movie.name.toLowerCase().includes(searchinput.value.toLowerCase())
         || movie.category.toLowerCase().includes(searchinput.value.toLowerCase())


   })

   if (filteredMovies.length === 0) {
      noResultMessage.textContent = "Sonuç Bulunamadı"
   }
   else {
      noResultMessage.textContent = ""
   }



   movieContainer.innerHTML = "";
   movieRenderer(filteredMovies);

})



let favorites = JSON.parse(localStorage.getItem("movieExplorerFavorites")) || []
let watched = JSON.parse(localStorage.getItem("movieExplorerWatched")) || []
let wantToWatch = JSON.parse(localStorage.getItem("movieExplorerWantToWatch")) || []

favoriteButton.addEventListener("click", () => {


   const isİnFavorite = favorites.some(movie => movie.id === currentMovie.id)

   if (isİnFavorite) {
      favorites = favorites.filter(movie => movie.id !== currentMovie.id)
   }
   else {

      favorites.push(currentMovie)

   }

   localStorage.setItem("movieExplorerFavorites", JSON.stringify(favorites))



})

watchedButton.addEventListener("click", () => {


   const isIntWatched = watched.some(movie => movie.id === currentMovie.id)

   if (isIntWatched) {
      watched = watched.filter(movie => movie.id !== currentMovie.id)
   }
   else {
      watched.push(currentMovie)
   }

   localStorage.setItem("movieExplorerWatched", JSON.stringify(watched))



})

wantToWatchButton.addEventListener("click", () => {

   const isInWantToWatch = wantToWatch.some(movie => movie.id === currentMovie.id)

   if (isInWantToWatch) {
      wantToWatch = wantToWatch.filter(movie => movie.id !== currentMovie.id)
   }
   else {
      wantToWatch.push(currentMovie)
   }

   localStorage.setItem("movieExplorerWantToWatch", JSON.stringify(wantToWatch))


})


allMoviesBtn.addEventListener("click", () => {

   movieContainer.innerHTML = ""

   movieRenderer(movies)
})


myFavoriteBtn.addEventListener("click", () => {
   movieContainer.innerHTML = ""

   movieRenderer(favorites)
})

watchedBtn.addEventListener("click", () => {
   movieContainer.innerHTML = ""

   movieRenderer(watched)
})

WatchListBtn.addEventListener("click", () => {
   movieContainer.innerHTML = ""

   movieRenderer(wantToWatch)
})

