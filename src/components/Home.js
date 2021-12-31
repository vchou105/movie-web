import React from 'react';
import './Home.css'
import SearchMovies from './SearchMovies'
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {
    // add movies on landing page
    const navigate = useNavigate(); 

    function handleHomePage() {
        navigate('/')
    }
    
    return (
        <div>
            <span className="home" onClick={handleHomePage}>🎬</span>
            <SearchMovies/>
        </div>
    )
}