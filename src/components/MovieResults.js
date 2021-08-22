import React, { useState } from 'react';
import './MovieResults.css';

const MovieResults = (props) => {
    const movies = props.data
    const pages = Math.ceil(movies.totalResults / 10)
    // const [pages, setPages] = useState([])
    const [currPage, setPage] = useState(1)
    const [query, setQuery] = useState("")
    // variables for selected movie data
    const [movie, setMovie] = useState([])
    const [showMovie, setShowMovie] = useState(false)

    const handleSearchTitle = (title) => {
        setQuery(title) 
        fetchAPI()
    }

    async function fetchAPI() {
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

    const setPages = () => {
        let pageOptions = []
        for (let i = 1; i <= pages; i++) {
            pageOptions.push(i)
        }
        return pageOptions
    }

    const loadPage = (pageNum) => { 
        setPage(pageNum) 
        props.search(pageNum)
    }

    // include a "show more" button to view more tahn 10 results at a time
    // useful for filtering by time range
    return (
        <div className="resultSection">
            { // display movie results if more than 1 result found
                movies.Response === "False" || movies.totalResults === 0
                    ? <span className="searchResultVal">No movies found -- try another search!</span>
                    : <div className="movieResults">
                        <span className="searchResultVal">Total results: {movies.totalResults}</span>
                        <div className="searchList">
                            {movies.Search.map(movie => {
                                // uses regex to handle cases when year has non-numeric values, such as "2011-"
                                let year = movie.Year.replace(/\D/g, '');
                                return <div onClick={() => handleSearchTitle(movie.Title)} className="searchMovieItem">
                                    <span className="searchMovieTitle">{movie.Title}</span>
                                    <span className="searchMovieYear">, {year}</span>
                                </div>
                            })}
                        </div>
                    </div>
            }
            <div className="pageBar">
                { 
                    setPages().map(page => {
                        return <span className={page === currPage ? "active pageOption" : "pageOption"} onClick={() => loadPage(page)}>{page}</span>
                        
                    })
                }
            </div>
            {
                showMovie && <div className="selectedMovie">
                    <div className="movieItem">
                        <div className="closeMovie">
                            <span className="close" onClick={() => setShowMovie(false)}>x</span>
                        </div>
                        <div className="moviePosterDetail">
                            { // display movie poster if available (not null or N/A)
                                movie.Poster && movie.Poster !== "N/A" && <img src={movie.Poster} alt={`Movie poster for ${movie.Title}`} />
                            }
                            <div className="movieDetail">
                                <div className="title">{movie.Title}</div>
                                {
                                    movie.Genre && movie.Genre !== "N/A" && <p className="genre">{movie.Genre}</p>
                                }
                                { // check each movie detail exists (not null or empty string) before showing
                                    movie.Released && movie.Released !== "N/A" && <p className="released">Released: {movie.Released}</p>
                                }
                                {
                                    movie.Runtime && movie.Runtime !== "N/A" && <p className="runtime">{movie.Runtime}</p>
                                }
                                {
                                    movie.Director && movie.Director !== "N/A" && <p className="director">Director: {movie.Director}</p>
                                }
                                { movie.Plot && movie.Plot !== "N/A" && <p className="plot">{movie.Plot}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default MovieResults;