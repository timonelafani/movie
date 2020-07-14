import React from "react";
import "../../Components/Style.css";
import logo from "../../images/logo.webp";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav";

const Header = props => {
  return (
    <header className="App-header">
      <Link to="/movies/popular">
        <img src={logo} className="logo"  alt="logo" />
      </Link>
      <Nav movies={props.movies} />
    </header>
  );
};

export default Header;
