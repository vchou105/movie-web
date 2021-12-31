import React, { useEffect, useState } from 'react';
import './SearchMovies.css';
import MovieResults from './MovieResults';
// import { useNavigate } from 'react-router-dom';

function SearchMovies() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")
    const [showMovies, setShowMovies] = useState(false)
    const [page, setPage] = useState(1)
    // const navigate = useNavigate()

    function handleSearch(e) {
        // cancel default submit action of form 
        e && e.preventDefault()
        async function fetchAPI() {
            // url for fetching json data from OMDb api with user input and api key
            let url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${process.env.REACT_APP_API_KEY}`
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
                // navigate(`search?q=${query}`)
                // find number of pages
                // handlePageOptions() 
                return data
            })
            .catch(error => { // catch network error or when response is invalid JSON
                console.error('Error: ', error) 
                return Promise.reject(error)
            })
        }        
        fetchAPI()
    }

    const handlePageSelected = (p) => {
        setPage(p) 
        handleSearch()
    }

    useEffect(() => {
        // similar to componentDidMount or componentDidUpdate
        if (!showMovies) {
            // navigate('/')
        }
    })

    return (
        <div className="searchMovies">
            <span className="searchTitle">Search for your favorite movies!</span>
            <form onSubmit={handleSearch}>
                <div className="searchBar">
                {/* <label htmlFor="movieInput" className="searchLabel">Search:</label> */}
                <input type="search" id="movieInput" value={query} className="searchInput" 
                    placeholder="Enter movie title..." onChange={e => setQuery(e.target.value)} required/>
                <span className="searchIcon">🎬🔎</span>
                </div>
            </form>
            { showMovies && <MovieResults data={movies} search={(p) => handlePageSelected(p)}/> } 
        </div>
    )
} 
export default SearchMovies;