async function getMovieRating(imdbId){
    const response = await fetch(`/.netlify/functions/movie?id=${imdbId}`)
    const data = await response.json()
    
    return data.imdbRating
    
}

async function getMovieDescription(imdbId){

    const response = await fetch(`/.netlify/functions/movie?id=${imdbId}`)

    const data = await response.json()

    return data.Plot
}



