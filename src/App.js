//import logo from './logo.svg';
import './App.css';
import React from "react";
import SearchMovie from './components/SearchMovies';
import { BrowserRouter, Switch, Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
        {/* <header className="App-header">
            <span className="App-logo">🎞👓📽🎥</span>
        </header> */}
      <BrowserRouter>
        <SearchMovie/>
      </BrowserRouter>
    </div>
  );
}

export default App;
