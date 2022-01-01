import React, { useState } from 'react';
import './Home.css'
import SearchMovies from './SearchMovies'

export default function Home() {
    // add movies on landing page
    
    return (
        <div>
            <a className="home" href="/">🎬</a>
            <SearchMovies /> 
            <span className="featuredMovies">Featured movies coming soon...</span>
        </div>
    )
}