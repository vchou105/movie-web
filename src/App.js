//import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Switch, Router, Route, Link } from "react-router-dom";
import { useRoutes, A } from "hookrouter";
import SearchMovies from './components/SearchMovies';
import Home from './components/Home'

const routes = {
  "/": () => <Home />,
  "/search": () => <SearchMovies />
}

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      {/* <Router> */}
        {/* <header className="App-header">
            <span className="App-logo">🎞👓📽🎥</span>
        </header> */}
      <BrowserRouter>
      <Home/>
        {/* <SearchMovies /> */}
      </BrowserRouter>
      {/* <A href="/">Home</A> */}
      {/* {routeResult} */}
      {/* </Router> */}
    </div>
  );
}

export default App;
