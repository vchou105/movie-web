import React, { useState } from 'react';
import './SearchMovies.css';
import MovieResults from './MovieResults';

function SearchMovies() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")
    const [showMovies, setShowMovies] = useState(false)

    function handleSearch(e) {
        // cancel default submit action of form 
        e.preventDefault()
        async function fetchAPI() {
            // url for fetching json data from OMDb api with user input and api key
            let url = `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_API_KEY}`
            // make get request (default) to movie api
            await fetch(url)
            .then(response => { // get Promise for json body of http response (not loaded yet)
                // parse json into JavaScript object (anything represented by json e.g. array, string, etc)
                return response.json()
            })
            .then(data => { // get response of previous resolved (successful) promise after awaiting json body
                // store returned json body of movie search results
                setMovies(data) 
                setShowMovies(true)
                return data
            })
            .catch(error => { // catch network error or when response is invalid JSON
                console.error('Error: ', error) 
                return Promise.reject(error)
            })
        }
        
        fetchAPI()
    }

    return (
        <div className="searchMovies">
            <span className="searchTitle">Search for your favorite movies!</span>
            <form onSubmit={handleSearch}>
                <label htmlFor="movieInput" className="">🎬🔎: </label>
                <input type="search" id="movieInput" value={query} className="searchInput" 
                    placeholder="Search movie title...🔍" onChange={e => setQuery(e.target.value)} required/>
            </form>
            { showMovies ? <MovieResults data={movies}/> : null} 
        </div>
    )
} 
export default SearchMovies;