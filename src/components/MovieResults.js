import React, { useState } from 'react';
import './MovieResults.css';

const MovieResults = (data) => {
    const movies = data.data
    // variables for selected movie data
    const [movie, setMovie] = useState([])
    const [showMovie, setShowMovie] = useState(false)

    async function handleSearchTitle(query) {
        // url for fetching json data of selected movie from OMDb api with user input and api key
        let url = `https://www.omdbapi.com/?t=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        // make get request (default) to movie api
        await fetch(url)
            .then(response => { // get Promise for json body of http response (not loaded yet)
                // parse json into JavaScript object (anything represented by json e.g. array, string, etc)
                return response.json()
            })
            .then(movieData => { // get response of previous resolved (successful) promise after awaiting json body
                // store returned json body of movie search results
                setMovie(movieData)
                setShowMovie(true)
                return movieData
            })
            .catch(error => { // catch network error or when response is invalid JSON
                console.error('Error: ', error)
                return Promise.reject(error)
            })
    }

    // include a "show more" button to view more tahn 10 results at a time
    // useful for filtering by time range
    return (
        <div className="movieResults">
            { // display movie results if more than 1 result found
                movies.Response === "False" || movies.totalResults == 0
                    ? <span className="searchResultVal">No movies found -- try another search!</span>
                    : <div className="resultSection">
                        <span className="searchResultVal">Total results: {movies.totalResults}</span>
                        <div className="searchList">
                            { movies.Search.map(movie => {
                                // display each movie detail
                                return <div onClick={() => handleSearchTitle(movie.Title)} className="searchMovieItem">
                                    <span className="searchMovieTitle">{movie.Title}</span>
                                    <span className="searchMovieYear">, {movie.Year}</span>
                                </div>
                                // return <div className="movieItem">
                                //     <img src={movie.Poster} alt={`Movie poster for ${movie.Title}`} />
                                //     <div className="movieDetail">
                                //         <div className="title">{movie.Title}</div>
                                //         <p>Released: {movie.Released}</p>
                                //         <p>{movie.Genre}</p>
                                //         <p>Director: {movie.Director}</p>
                                //         <p>{movie.Runtime}</p>
                                //         <p>{movie.Plot}</p>
                                //     </div>
                                // </div> 
                            })} </div>
                    </div>

            }
            {
                showMovie
                    ? <div className="selectedMovie">
                        <div className="movieItem">
                            <span className="close" onClick={() => setShowMovie(false)}>x</span>
                            { // display movie poster if available (not null or empty string)
                                movie.Poster && movie.Poster != "" && <img src={movie.Poster} alt={`Movie poster for ${movie.Title}`} />
                            }
                            <div className="movieDetail">
                                <div className="title">{movie.Title}</div>
                                {
                                    movie.Genre && movie.Genre != "" && <p className="genre">{movie.Genre}</p>
                                }
                                { // check each movie detail exists (not null or empty string) before showing
                                    movie.Released && movie.Released != "" && <p className="released">Released: {movie.Released}</p>
                                }
                                {
                                    movie.Runtime && movie.Runtime != "" && <p className="runtime">{movie.Runtime}</p>
                                }                                
                                {
                                    movie.Director && movie.Director != "" && <p className="director">Director: {movie.Director}</p>
                                }
                                <p className="plot">{movie.Plot}</p>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
export default MovieResults;